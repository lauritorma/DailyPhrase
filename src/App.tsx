import { MotionConfig, motion } from "motion/react";
import { getDailyPuzzle } from "./lib/dailyPuzzle";
import styles from "./App.module.css";

const MAX_ATTEMPTS = 6;

export default function App() {
  const puzzle = getDailyPuzzle();

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.page}>
        <header>
          <p className={styles.eyebrow}>
            DAILY PHRASE / DEVELOPMENT DEMO
          </p>

          <h1 className={styles.title}>Something worth discovering.</h1>

          <p className={styles.intro}>
            One phrase. Six attempts. Real words only.
          </p>

          <p className={styles.meta}>
            {puzzle.dateKey} · Daily boundary: 00:00 UTC
          </p>
        </header>

        <section aria-labelledby="board-title">
          <h2 id="board-title" className={styles.boardTitle}>
            Today&apos;s phrase
          </h2>

          <p className={styles.meta}>
            Word lengths: {puzzle.wordLengths.join(" / ")}.
            {" "}Six empty attempts are shown below.
          </p>

          <div className={styles.board} aria-hidden="true">
            {Array.from({ length: MAX_ATTEMPTS }, (_, attempt) => (
              <motion.div
                key={`${puzzle.id}:${attempt}`}
                className={styles.row}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: attempt * 0.04,
                }}
              >
                {puzzle.wordLengths.map((length, wordIndex) => (
                  <div className={styles.word} key={wordIndex}>
                    {Array.from({ length }, (_, letterIndex) => (
                      <span
                        className={styles.tile}
                        key={letterIndex}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        <p className={styles.notice}>
          Setup complete. Guess entry, dictionary validation, and
          letter feedback have not been implemented yet.
        </p>
      </main>
    </MotionConfig>
  );
}