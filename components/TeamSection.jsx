"use client";

import { useState } from "react";
import TeamCard from "./TeamCard";
import styles from "./TeamSection.module.css";

const TEAM_MEMBERS = [
  {
    id: "peter-lee",
    name: "Peter Lee",
    role: "Founder of Genesy",
    image: "/assets/framerusercontent_local/images/uOR0RXqCvncnJFhOe6kPbaE9XLU__q_2b33f34c.jpg",
    bio: "Visionary leader passionate about building innovative digital solutions and growing strong teams.",
    socialUrl: "#"
  },
  {
    id: "sofia-martin",
    name: "Sofia Martin",
    role: "Project Manager",
    image: "/assets/framerusercontent_local/images/1npfGLlqv0pYlMaSztSZwYvxk8__q_2b33f34c.jpg",
    bio: "Keeps execution sharp, timelines realistic, and cross-functional teams aligned from kickoff to launch.",
    socialUrl: "#"
  },
  {
    id: "daniel-lee",
    name: "Daniel Lee",
    role: "Founder of Genesy",
    image: "/assets/framerusercontent_local/images/MomPz94qSlotLpSZGsClt7ecwo__q_af89e6e9.jpg",
    bio: "Drives product direction and brand strategy with a focus on practical AI outcomes for clients.",
    socialUrl: "#"
  },
  {
    id: "lucas-harris",
    name: "Lucas Harris",
    role: "AI Consultant",
    image: "/assets/framerusercontent_local/images/hH2rYuywmmCBCyncBcetdrzKC0__q_a63124a2.jpg",
    bio: "Designs AI systems and workflows that are safe, measurable, and easy for teams to adopt.",
    socialUrl: "#"
  }
];

export default function TeamSection() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className={styles.section} id="team" aria-label="Team">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>The Team</span>
            </p>
          </div>

          <div className={styles.headingRow}>
            <div className={styles.headingTitleWrap}>
              <h2 className={styles.headingTitle}>
                <span>The Team</span>
              </h2>
            </div>
            <div className={styles.headingBody}>
              <p className={styles.headingDescription}>
                A team of passionate professionals delivering expert, creative work every time.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {TEAM_MEMBERS.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              isExpanded={expandedId === member.id}
              onToggle={() => setExpandedId((current) => (current === member.id ? null : member.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
