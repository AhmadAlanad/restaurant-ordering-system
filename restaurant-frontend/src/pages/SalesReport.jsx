import { useEffect, useState } from "react";
import api from "../services/api";

function SalesReport() {

    const [report, setReport] = useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response = await api.get("/reports");

            setReport(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!report) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <div className="container mt-4">

            <h2>Sales Report</h2>

            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Total Revenue</h5>
                            <h3>{report.totalRevenue} SR</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Today's Revenue</h5>
                            <h3>{report.todayRevenue} SR</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Weekly Revenue</h5>
                            <h3>{report.weekRevenue} SR</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Monthly Revenue</h5>
                            <h3>{report.monthRevenue} SR</h3>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Total Orders</h5>
                            <h3>{report.totalOrders}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Accepted Orders</h5>
                            <h3>{report.acceptedOrders}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Pending Orders</h5>
                            <h3>{report.pendingOrders}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Rejected Orders</h5>
                            <h3>{report.rejectedOrders}</h3>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default SalesReport;