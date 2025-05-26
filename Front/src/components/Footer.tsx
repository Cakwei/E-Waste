export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Request Waste Collection</a>
        <a className="link link-hover">View Collection Request</a>
        <a className="link link-hover">Available send-off locations</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
            <i className="bi bi-twitter-x text-[20px]"></i>
          </a>
          <a>
            <i className="bi bi-youtube text-[25px]"></i>
          </a>
        </div>
      </nav>
    </footer>
  );
}
