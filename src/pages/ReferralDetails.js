import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import { formatDate, formatProfit } from "../utils/formatters";
import {
  IconArrowLeft,
  IconBriefcase,
  IconCalendar,
  IconDollarSign,
  IconHash,
  IconAlertCircle,
} from "../components/icons";

function ReferralDetails() {
  const { id } = useParams();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchReferral();
}, [id]);

  const fetchReferral = async () => {
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

      const data = await response.json();

      if (response.ok) {
        const selectedReferral = data.data.referrals.find(
          item => item.id === Number(id)
        );

        setReferral(selectedReferral);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="state-screen">
          <div className="state-block">
            <div className="spinner" />
            <p className="state-title">Loading referral…</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!referral) {
    return (
      <Layout>
        <div className="state-screen">
          <div className="state-block">
            <div className="state-icon is-error">
              <IconAlertCircle />
            </div>
            <h2 className="state-title">Referral not found</h2>
            <p className="state-text">
              This referral may have been removed or the link is incorrect.
            </p>
            <Link to="/" className="btn btn-secondary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const initials = referral.name
    .split(" ")
    .map(part => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Layout>
      <div className="shell">
        <div className="page-header">
          <Link to="/" className="details-back">
            <IconArrowLeft />
            Back to Dashboard
          </Link>

          <div className="details-header">
            <div className="details-identity">
              <div className="details-avatar">{initials}</div>
              <div>
                <h1 className="details-name">{referral.name}</h1>
                <span className="details-id">Referral #{referral.id}</span>
              </div>
            </div>

            <span className="status-pill">Active</span>
          </div>
        </div>

        <div className="card">
          <div className="details-grid">
            <div className="detail-field">
              <div className="detail-field-label">
                <IconHash />
                Referral ID
              </div>
              <div className="detail-field-value">{referral.id}</div>
            </div>

            <div className="detail-field">
              <div className="detail-field-label">
                <IconBriefcase />
                Service Name
              </div>
              <div className="detail-field-value">{referral.serviceName}</div>
            </div>

            <div className="detail-field">
              <div className="detail-field-label">
                <IconCalendar />
                Date
              </div>
              <div className="detail-field-value">{formatDate(referral.date)}</div>
            </div>

            <div className="detail-field">
              <div className="detail-field-label">
                <IconDollarSign />
                Profit
              </div>
              <div className="detail-field-value is-profit">
                {formatProfit(referral.profit)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReferralDetails;
