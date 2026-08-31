import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5f5f5',
padding: 24,
},

loadingContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},

header: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 25,
},

backButton: {
  marginRight: 25,
},

back: {
fontSize: 16,
fontWeight: '600',
marginRight: 25,
},

title: {
fontSize: 28,
fontWeight: '700',
},

sectionTitle: {
fontSize: 20,
fontWeight: '700',
marginBottom: 12,
marginTop: 10,
},

input: {
height: 50,
borderWidth: 1,
borderColor: '#dddddd',
borderRadius: 10,
backgroundColor: '#ffffff',
paddingHorizontal: 15,
fontSize: 15,
marginBottom: 12,
},

locationButton: {
backgroundColor: '#ffffff',
borderWidth: 1,
borderColor: '#dddddd',
paddingVertical: 13,
borderRadius: 10,
alignItems: 'center',
marginBottom: 10,
},

locationText: {
fontSize: 15,
fontWeight: '600',
},

locationInfo: {
backgroundColor: '#ffffff',
padding: 12,
borderRadius: 10,
marginBottom: 10,
},

locationTextSmall: {
fontWeight: '600',
marginBottom: 4,
},

coordinates: {
fontSize: 13,
color: '#666666',
marginTop: 3,
},

addButton: {
backgroundColor: '#222222',
paddingVertical: 10,
borderRadius: 10,
alignItems: 'center',
marginBottom: 20,
},

addButtonText: {
color: '#ffffff',
fontSize: 16,
fontWeight: '700',
},

addressCard: {
backgroundColor: '#ffffff',
borderRadius: 12,
padding: 18,
marginBottom: 12,
},

addressLabel: {
fontSize: 18,
fontWeight: '700',
marginBottom: 6,
},

description: {
fontSize: 15,
color: '#444444',
marginBottom: 10,
},

deleteButton: {
alignSelf: 'flex-end',
marginTop: 10,
},

deleteText: {
color: '#cc0000',
fontWeight: '600',
},

empty: {
textAlign: 'center',
color: '#666666',
marginTop: 20,
},

list: {
paddingBottom: 30,
},
});