import { useEffect, useState, Fragment } from "react";
import api from "../services/api";
import "../styles/SalesReport.css";

function SalesReport() {


    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categorySales, setCategorySales] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);
    const [loadingCategoryItems, setLoadingCategoryItems] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");



    useEffect(() => {

        loadReport();
        loadCategorySales();

    }, []);


    const loadReport = async (
        from = fromDate,
        to = toDate
    ) => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/reports", {
                params: from && to
                    ? {
                        from,
                        to
                    }
                    : {}
            });

            setReport(response.data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load the sales report. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    const loadCategorySales = async (
        from = fromDate,
        to = toDate
    ) => {

        try {

            const response = await api.get("/reports/categories", {
                params: from && to
                    ? {
                        from,
                        to
                    }
                    : {}
            });

            setCategorySales(response.data);

        } catch (error) {

            console.error("Failed to load category sales:", error);

        }

    };



    const handleCategoryClick = async (category) => {

        // If the clicked category is already open, close it
        if (
            selectedCategory?.categoryId ===
            category.categoryId
        ) {

            setSelectedCategory(null);
            setCategoryItems([]);

            return;
        }

        try {

            // Open the newly selected category
            setSelectedCategory(category);

            setLoadingCategoryItems(true);

            setCategoryItems([]);

            const response = await api.get(
                `/reports/categories/${category.categoryId}`,
                {
                    params: fromDate && toDate
                        ? {
                            from: fromDate,
                            to: toDate
                        }
                        : {}
                }
            );

            setCategoryItems(response.data);

        } catch (error) {

            console.error(
                "Failed to load category items:",
                error
            );

        } finally {

            setLoadingCategoryItems(false);

        }

    };



    const applyDateFilter = () => {

        if (!fromDate || !toDate) {

            alert(
                "Please select both a From and To date."
            );

            return;
        }


        if (fromDate > toDate) {

            alert(
                "The From date cannot be after the To date."
            );

            return;
        }


        // Close expanded category details
        setSelectedCategory(null);
        setCategoryItems([]);


        // Load data using the selected dates
        loadReport(fromDate, toDate);
        loadCategorySales(fromDate, toDate);

    };

    const resetDateFilter = () => {

        // Reset date fields
        setFromDate("");
        setToDate("");


        // Close expanded category details
        setSelectedCategory(null);
        setCategoryItems([]);


        // Explicitly load unfiltered data
        loadReport("", "");
        loadCategorySales("", "");

    };

    if (loading) {

        return (
            <div className="container sales-report">

                <div className="text-center mt-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3 text-muted">
                        Loading sales report...
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="container sales-report">

                <div className="alert alert-danger text-center mt-4">

                    <h5>
                        Unable to Load Report
                    </h5>

                    <p className="mb-3">
                        {error}
                    </p>

                    <button
                        className="btn btn-outline-danger"
                        onClick={loadReport}
                    >
                        🔄 Try Again
                    </button>

                </div>

            </div>
        );

    }



    const formatCurrency = (amount) => {

        return Number(amount || 0).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    return (


        <div className="container sales-report">

            {/* Header */}

            <div className="sales-report-header">

                <h2>
                    Sales Report
                </h2>

                <p>
                    Monitor your restaurant's sales performance and revenue.
                </p>

            </div>

            {/* Date Filter */}

            <div className="sales-date-filter">

                <div className="sales-date-filter-header">

                    <div>

                        <h6>
                            📅 Filter by Date
                        </h6>

                        <small>
                            Select a date range to view sales data.
                        </small>

                    </div>

                </div>


                <div className="row g-3 align-items-end">

                    {/* From Date */}

                    <div className="col-md-4">

                        <label className="form-label">
                            From
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={fromDate}
                            onChange={(e) =>
                                setFromDate(e.target.value)
                            }
                        />

                    </div>


                    {/* To Date */}

                    <div className="col-md-4">

                        <label className="form-label">
                            To
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={toDate}
                            onChange={(e) =>
                                setToDate(e.target.value)
                            }
                        />

                    </div>


                    {/* Actions */}

                    <div className="col-md-4">

                        <div className="d-flex gap-2">

                            <button
                                className="btn btn-primary"
                                onClick={applyDateFilter}
                            >
                                🔍 Apply Filter
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={resetDateFilter}
                                disabled={!fromDate && !toDate}
                            >
                                Reset
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Revenue Section */}

            <div className="sales-report-section">

                <h5 className="sales-report-section-title">
                    💰 Revenue Overview
                </h5>

                <div className="row g-4">

                    {/* Total Revenue */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    💰
                                </div>

                                <p className="sales-report-card-label">
                                    Total Revenue
                                </p>

                                <h3 className="sales-report-card-value">
                                    {formatCurrency(report.totalRevenue)} SR
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Today's Revenue */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    📅
                                </div>

                                <p className="sales-report-card-label">
                                    Today's Revenue
                                </p>

                                <h3 className="sales-report-card-value">
                                    {formatCurrency(report.todayRevenue)} SR
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Weekly Revenue */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    📈
                                </div>

                                <p className="sales-report-card-label">
                                    This Week
                                </p>

                                <h3 className="sales-report-card-value">
                                    {formatCurrency(report.weekRevenue)} SR
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Monthly Revenue */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    📊
                                </div>

                                <p className="sales-report-card-label">
                                    This Month
                                </p>

                                <h3 className="sales-report-card-value">
                                    {formatCurrency(report.monthRevenue)} SR
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>



            {/* Order Overview */}

            <div className="sales-report-section">

                <h5 className="sales-report-section-title">
                    📦 Order Overview
                </h5>

                <div className="row g-4">

                    {/* Total Orders */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    📦
                                </div>

                                <p className="sales-report-card-label">
                                    Total Orders
                                </p>

                                <h3 className="sales-report-card-value">
                                    {report.totalOrders}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Accepted Orders */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    ✅
                                </div>

                                <p className="sales-report-card-label">
                                    Accepted Orders
                                </p>

                                <h3 className="sales-report-card-value">
                                    {report.acceptedOrders}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Pending Orders */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    ⏳
                                </div>

                                <p className="sales-report-card-label">
                                    Pending Orders
                                </p>

                                <h3 className="sales-report-card-value">
                                    {report.pendingOrders}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Rejected Orders */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card sales-report-card text-center">

                            <div className="card-body">

                                <div className="sales-report-card-icon">
                                    ❌
                                </div>

                                <p className="sales-report-card-label">
                                    Rejected Orders
                                </p>

                                <h3 className="sales-report-card-value">
                                    {report.rejectedOrders}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className="sales-report-section">

                <h5 className="sales-report-section-title">
                    🏷️ Sales by Category
                </h5>

                <div className="card sales-report-card">

                    <div className="card-body">

                        {categorySales.length === 0 ? (

                            <p className="text-muted text-center mb-0">
                                No category sales available yet.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0 sales-category-table">

                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Items Sold</th>
                                            <th>Total Sales</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {categorySales.map((category) => (

                                            <Fragment key={category.categoryId}>
                                                {/* Category Row */}

                                                <tr
                                                    className="sales-category-row"
                                                    onClick={() => handleCategoryClick(category)}
                                                >

                                                    <td>
                                                        <strong>

                                                            {selectedCategory?.categoryId ===
                                                                category.categoryId
                                                                ? "▼ "
                                                                : "▶ "}

                                                            {category.categoryName}

                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {category.quantitySold}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {formatCurrency(category.totalSales)} SR
                                                        </strong>
                                                    </td>

                                                </tr>


                                                {/* Expanded Menu Items */}

                                                {selectedCategory?.categoryId ===
                                                    category.categoryId && (

                                                        <tr className="sales-category-details-row">

                                                            <td colSpan="3">

                                                                <div className="sales-category-details">

                                                                    {loadingCategoryItems ? (

                                                                        <div className="text-center text-muted">
                                                                            Loading category details...
                                                                        </div>

                                                                    ) : categoryItems.length === 0 ? (

                                                                        <div className="text-center text-muted">
                                                                            No sales found for this category.
                                                                        </div>

                                                                    ) : (

                                                                        <table className="table table-sm table-hover mb-0">

                                                                            <thead>

                                                                                <tr>
                                                                                    <th>Menu Item</th>
                                                                                    <th>Quantity Sold</th>
                                                                                    <th>Total Sales</th>
                                                                                </tr>

                                                                            </thead>

                                                                            <tbody>

                                                                                {categoryItems.map((item) => (

                                                                                    <tr key={item.menuItemId}>

                                                                                        <td>
                                                                                            ↳ {item.menuItemName}
                                                                                        </td>

                                                                                        <td>
                                                                                            {item.quantitySold}
                                                                                        </td>

                                                                                        <td>
                                                                                            <strong>
                                                                                                {formatCurrency(
                                                                                                    item.totalSales
                                                                                                )} SR
                                                                                            </strong>
                                                                                        </td>

                                                                                    </tr>

                                                                                ))}

                                                                            </tbody>

                                                                        </table>

                                                                    )}

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    )}

                                            </Fragment>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SalesReport;