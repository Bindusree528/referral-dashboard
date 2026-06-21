import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  formatDate,
  formatProfit,
} from "../utils/formatters";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  IconSearch,
  IconCopy,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconUsers,
  IconActivity,
  IconTrendingUp,
  IconDollarSign,
  IconBriefcase,
  IconInbox,
  IconAlertCircle,
} from "../components/icons";

const METRIC_ICONS = [IconUsers, IconActivity, IconTrendingUp, IconDollarSign];

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedField, setCopiedField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        setError("Failed to fetch dashboard data");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const handleCopy = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 1800);
    } catch (err) {
      // Clipboard access failed silently — no functional fallback required.
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="state-screen">
          <div className="state-block">
            <div className="spinner" />
            <p className="state-title">Loading your dashboard…</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="state-screen">
          <div className="state-block">
            <div className="state-icon is-error">
              <IconAlertCircle />
            </div>
            <h2 className="state-title">{error}</h2>
            <p className="state-text">
              Please refresh the page or try again in a moment.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredReferrals =
    data.referrals.filter(referral =>
      referral.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      referral.serviceName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const sortedReferrals = [...filteredReferrals];

    sortedReferrals.sort((a, b) => {
    if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
    }

    return new Date(b.date) - new Date(a.date);
    });

    const itemsPerPage = 10;

    const startIndex =
    (currentPage - 1) * itemsPerPage;

    const endIndex =
    startIndex + itemsPerPage;

    const currentReferrals =
    sortedReferrals.slice(
        startIndex,
        endIndex
    );

    const totalPages = Math.ceil(
    sortedReferrals.length / itemsPerPage
    ) || 1;

return (
  <Layout>
    <div className="shell">
      <div className="page-header">
        <span className="page-eyebrow">Dashboard</span>
        <h1 className="page-title">Referral Dashboard</h1>
        <p className="page-subtitle">
          Track your referrals, earnings, and partner activity in one place.
        </p>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Overview</h2>
        </div>
        <div className="metrics-grid">
          {data.metrics.map((metric, index) => {
            const MetricIcon = METRIC_ICONS[index % METRIC_ICONS.length];
            return (
              <div className="metric-card" key={metric.id}>
                <div className="metric-card-icon">
                  <MetricIcon />
                </div>
                <h3 className="metric-card-label">{metric.label}</h3>
                <p className="metric-card-value">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Service Summary</h2>
        </div>

        <div className="card">
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-label">Service</div>
              <div className="summary-value">{data.serviceSummary.service}</div>
            </div>

            <div className="summary-item">
              <div className="summary-label">Your Referrals</div>
              <div className="summary-value">{data.serviceSummary.yourReferrals}</div>
            </div>

            <div className="summary-item">
              <div className="summary-label">Active Referrals</div>
              <div className="summary-value">{data.serviceSummary.activeReferrals}</div>
            </div>

            <div className="summary-item">
              <div className="summary-label">Total Ref. Earnings</div>
              <div className="summary-value">{data.serviceSummary.totalRefEarnings}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Refer friends and earn more</h2>
        </div>

        <div className="card card-padded">
          <div className="referral-share-grid">
            <div className="referral-field">
              <span className="referral-field-label">Your Referral Link</span>
              <div className="referral-box">
                <input readOnly value={data.referral.link} />
                <button
                  type="button"
                  className={`btn-copy${copiedField === "link" ? " is-copied" : ""}`}
                  onClick={() => handleCopy(data.referral.link, "link")}
                >
                  {copiedField === "link" ? <IconCheck /> : <IconCopy />}
                  {copiedField === "link" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="referral-field">
              <span className="referral-field-label">Your Referral Code</span>
              <div className="referral-box">
                <input readOnly value={data.referral.code} />
                <button
                  type="button"
                  className={`btn-copy${copiedField === "code" ? " is-copied" : ""}`}
                  onClick={() => handleCopy(data.referral.code, "code")}
                >
                  {copiedField === "code" ? <IconCheck /> : <IconCopy />}
                  {copiedField === "code" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">All Referrals</h2>
          <span className="section-hint">
            <IconBriefcase style={{ width: 14, height: 14, display: "inline", verticalAlign: -2, marginRight: 4 }} />
            {data.referrals.length} total
          </span>
        </div>

        <div className="filters-bar">
          <div className="search-field">
            <IconSearch />
            <input
              type="text"
              className="input"
              placeholder="Name or service…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <label className="sort-field">
            Sort by date
            <select
              className="select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>

          <span className="results-count">
            {sortedReferrals.length} result{sortedReferrals.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Profit</th>
                  <th aria-hidden="true"></th>
                </tr>
              </thead>

              <tbody>
                {currentReferrals.length === 0 ? (
                  <tr className="table-empty-row">
                    <td colSpan={5}>
                      <div className="state-block" style={{ margin: "0 auto" }}>
                        <div className="state-icon">
                          <IconInbox />
                        </div>
                        <p className="state-title" style={{ fontSize: "var(--fs-md)" }}>
                          No referrals found
                        </p>
                        <p className="state-text">
                          Try adjusting your search to find what you're looking for.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentReferrals.map(referral => (
                    <tr
                      key={referral.id}
                      tabIndex={0}
                      onClick={() =>
                        navigate(`/referral/${referral.id}`)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          navigate(`/referral/${referral.id}`);
                        }
                      }}
                    >
                      <td className="cell-name">{referral.name}</td>
                      <td className="cell-service">{referral.serviceName}</td>
                      <td className="cell-date">{formatDate(referral.date)}</td>
                      <td className="cell-profit">{formatProfit(referral.profit)}</td>
                      <td className="cell-chevron">
                        <IconChevronRight />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="pagination-info">
              Showing {sortedReferrals.length === 0 ? 0 : startIndex + 1}–
              {Math.min(endIndex, sortedReferrals.length)} of{" "}
              {sortedReferrals.length} entries
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IconChevronLeft />
                Previous
              </button>

              <span className="pagination-page">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
}

export default Dashboard;
