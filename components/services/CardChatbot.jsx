import styles from "../ServicesSection.module.css";
import CardShell from "./CardShell";
import {
  FaArrowUpRightFromSquare,
  FaChevronUp,
  FaCircle,
  FaRegMessage,
  FaMinus,
  FaPlus,
  FaRobot,
  FaUser
} from "react-icons/fa6";

const chips = ["Architecture", "Validation", "Delivery"];
const messages = [
  { role: "user", text: "Routing lead to sales..." },
  { role: "assistant", text: "Response SLA improved by 42%." }
];

export default function CardChatbot({ content }) {
  const title = content?.title || "Custom AI Systems & Document Intelligence";
  const description =
    content?.description || "Multi-tier AI systems from first principles with a focus on accuracy, cost, and explainability.";

  return (
    <CardShell
      icon={FaRegMessage}
      title={title}
      description={description}
      className={styles.cardChatbot}
      markers={["active", "muted", "muted", "muted"]}
    >
      <div className={`${styles.featureUI} ${styles.chatbotFeatureUI}`}>
        <div className={styles.chipRow}>
          {chips.map((chip) => (
            <span key={chip} className={`${styles.chip} ${styles.chipMono}`}>
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.chatThread} aria-label="Chatbot message preview">
          {messages.map((item, index) => (
            <div
              key={`${item.role}-${index}`}
              className={`${styles.chatLine} ${item.role === "assistant" ? styles.chatLineAssistant : styles.chatLineUser}`}
              style={{ "--chat-delay": `${index * 0.1}s` }}
            >
              <span className={styles.chatLineIcon}>
                {item.role === "assistant" ? <FaRobot /> : <FaUser />}
              </span>
              <span className={styles.chatLineText}>{item.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.chatbotBottom}>
          <div className={styles.chatbotTextWrap}>
            <span className={styles.chatbotVBar} aria-hidden="true" />
            <span className={styles.chatbotCounter}>|</span>
          </div>

          <div className={styles.chatbotFooter} aria-hidden="true">
            <div className={styles.footerGroup}>
              <span className={styles.footerGlyph}>
                <FaPlus />
              </span>
              <span className={styles.footerGlyph}>
                <FaCircle />
              </span>
              <span className={styles.footerGlyph}>
                <FaMinus />
              </span>
            </div>
            <div className={styles.footerGroup}>
              <span className={styles.footerGlyph}>
                <FaChevronUp />
              </span>
              <span className={styles.footerGlyph}>
                <FaArrowUpRightFromSquare />
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
