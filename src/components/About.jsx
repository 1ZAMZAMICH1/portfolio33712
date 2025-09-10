import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { FaReact, FaPython, FaJsSquare, FaGitAlt } from 'react-icons/fa';
import { SiBlender, SiCplusplus, SiTailwindcss, SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiCoreldraw, SiFigma } from 'react-icons/si';
import styles from './About.module.css';

const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'JavaScript', icon: <FaJsSquare /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'C++', icon: <SiCplusplus /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Figma', icon: <SiFigma /> },
  { name: 'Photoshop', icon: <SiAdobephotoshop /> },
  { name: 'Illustrator', icon: <SiAdobeillustrator /> },
  { name: 'After Effects', icon: <SiAdobeaftereffects /> },
  { name: 'Blender', icon: <SiBlender /> },
  { name: 'CorelDRAW', icon: <SiCoreldraw /> },
  { name: 'Git', icon: <FaGitAlt /> },
];

function About() {
  const el = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Я — мост между кодом и эстетикой.^1000",
        "Создаю не просто интерфейсы, а цифровые миры.^1000",
        "Каждый пиксель имеет значение.^1000",
        "Моя страсть — решение невозможных задач.^1000",
        "Это не работа. Это искусство.^1000",
        "Моя цель — превращать идеи в незабываемый опыт."
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
    });
    return () => { typed.destroy(); };
  }, []);

  const handleSpeedUp = () => {
    if (scrollerRef.current) {
      scrollerRef.current.classList.add(styles.fastScroll);
      setTimeout(() => {
        scrollerRef.current.classList.remove(styles.fastScroll);
      }, 1000);
    }
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.textContainer}>
        <h4 className={styles.name}>Эдгар Штромаер</h4>
        <h2 className={styles.title}>Манифест</h2>
        <p className={styles.manifesto}><span ref={el}></span></p>
        <div className={styles.keywords}>
          <span>Дизайн</span><span>Код</span><span>Эстетика</span>
        </div>

        <div className={styles.arsenalBlock}>
          <div className={styles.scrollerContainer}>
            <div className={styles.scroller} ref={scrollerRef}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.skillCard}>
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <p className={styles.skillName}>{skill.name}</p>
                </div>
              ))}
              {skills.map((skill, index) => (
                <div key={`clone-${index}`} className={styles.skillCard} aria-hidden="true">
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <p className={styles.skillName}>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;