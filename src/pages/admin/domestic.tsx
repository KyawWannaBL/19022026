import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhoneAlt, FaEnvelope, FaClock, FaBolt, FaArrowRight, FaDoorOpen, FaBoxOpen, FaMobileAlt } from "react-icons/fa";

const DomesticExpress: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 small">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div>
            <FaPhoneAlt className="me-2" /> +95 9 897 4477 44
            <span className="ms-3">
              <FaEnvelope className="me-2" /> info@britiumexpress.com
            </span>
          </div>
          <div>
            <FaClock className="me-2" /> Mon-Sat: 9:00am - 5:30pm
          </div>
        </div>
      </div>

      {/* Hero */}
      <header
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(rgba(13,44,84,0.85), rgba(13,44,84,0.85)), url('https://images.unsplash.com/photo-1595150937666-419b48f93309')",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Domestic Express</h1>
          <p className="lead">
            Connecting Yangon, Mandalay, and Nay Pyi Taw with speed and
            precision.
          </p>
        </div>
      </header>

      {/* Routes */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-primary">Priority Routes</h2>

          <RouteCard
            title="Yangon City Same-Day"
            subtitle="Downtown & Major Townships"
            badge="Same Day"
          />
          <RouteCard
            title="Yangon → Mandalay"
            subtitle="Daily Highway Express"
            badge="Next Day"
          />
          <RouteCard
            title="Yangon → Nay Pyi Taw"
            subtitle="Government & Commercial Cargo"
            badge="Next Day"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-light py-5 text-center">
        <div className="container row mx-auto">
          <Feature
            icon={<FaDoorOpen size={40} />}
            title="Door-to-Door"
            text="Pickup and deliver directly to receiver."
          />
          <Feature
            icon={<FaBoxOpen size={40} />}
            title="Secure Handling"
            text="Safe packaging and professional care."
          />
          <Feature
            icon={<FaMobileAlt size={40} />}
            title="Real-Time Updates"
            text="Track via Website or Mobile App."
          />
        </div>
      </section>
    </>
  );
};

interface RouteProps {
  title: string;
  subtitle: string;
  badge: string;
}

const RouteCard: React.FC<RouteProps> = ({ title, subtitle, badge }) => (
  <div className="card mb-3 shadow-sm border-start border-4 border-primary">
    <div className="card-body d-flex justify-content-between align-items-center">
      <div>
        <h5 className="fw-bold mb-1">{title}</h5>
        <small className="text-muted">{subtitle}</small>
      </div>
      <span className="badge bg-primary">{badge}</span>
    </div>
  </div>
);

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => (
  <div className="col-md-4">
    <div className="mb-3 text-warning">{icon}</div>
    <h5 className="fw-bold">{title}</h5>
    <p className="text-muted small">{text}</p>
  </div>
);

export default DomesticExpress;