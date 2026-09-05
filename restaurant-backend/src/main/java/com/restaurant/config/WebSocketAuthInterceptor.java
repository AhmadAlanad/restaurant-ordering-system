package com.restaurant.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.restaurant.security.CustomUserDetailsService;
import com.restaurant.security.JwtService;

@Component
public class WebSocketAuthInterceptor
        implements ChannelInterceptor {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    public Message<?> preSend(
            Message<?> message,
            MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        StompCommand command = accessor.getCommand();

        // ==========================================
        // CONNECT
        // ==========================================

        if (StompCommand.CONNECT.equals(command)) {

            String authHeader = accessor.getFirstNativeHeader(
                    "Authorization");

            if (authHeader == null ||
                    !authHeader.startsWith("Bearer ")) {

                throw new IllegalArgumentException(
                        "Missing WebSocket authorization token");
            }

            String jwt = authHeader.substring(7);

            String email;

            try {

                email = jwtService.extractEmail(jwt);

            } catch (Exception e) {

                throw new IllegalArgumentException(
                        "Invalid WebSocket token");
            }

            UserDetails userDetails = userDetailsService
                    .loadUserByUsername(email);

            if (!jwtService.isTokenValid(
                    jwt,
                    userDetails)) {

                throw new IllegalArgumentException(
                        "Invalid or expired WebSocket token");
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());

            // Set authentication on the STOMP message
            accessor.setUser(authentication);

            // Store authentication in the STOMP session
            accessor.getSessionAttributes()
                    .put(
                            "WEBSOCKET_AUTHENTICATION",
                            authentication);
        }

        // ==========================================
        // SUBSCRIBE
        // ==========================================

        if (StompCommand.SUBSCRIBE.equals(command)) {

            String destination = accessor.getDestination();

            if ("/topic/new-orders".equals(destination)) {

                Authentication authentication = (Authentication) accessor
                        .getSessionAttributes()
                        .get(
                                "WEBSOCKET_AUTHENTICATION");

                if (authentication == null ||
                        authentication.getAuthorities()
                                .stream()
                                .noneMatch(
                                        authority -> authority.getAuthority()
                                                .equals("ROLE_ADMIN"))) {

                    throw new org.springframework.security.access.AccessDeniedException(
                            "Only admins can subscribe to order notifications");
                }

                // Restore authentication on the message
                accessor.setUser(authentication);
            }
        }

        return message;
    }
}
