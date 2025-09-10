import { FaTelegramPlane, FaWhatsapp, FaVk, FaInstagram } from 'react-icons/fa';
import MatrixBackground from './MatrixBackground';
import styles from './Contacts.module.css';

const contacts = [
  { 
    network: 'telegram', 
    icon: <FaTelegramPlane />, 
    name: '𝗺𝗰𝗰𝗶𝗮𝗵𝗵𝗮.𝗲𝗲𝗽✞ɢ̷̘͙͇͖͛̇̑͗͌͜͝l̴̡̡̨̲̠͕ ̘̪̖͍͗̓̕i̶̡̢̡̺͍̜̟̲͇̰̦̯̎̀̏̄̀́͊́͆̇̎̓̕͜͝ṫ̷̢', 
    handle: '@𝗺𝗰𝗰𝗶𝗮𝗵𝗵𝗮.𝗲𝗲𝗽✞', 
    link: 'https://t.me/+77021582932',
    actionText: 'Написать сообщение',
    avatar: '/tel.png',
  },
  { 
    network: 'whatsapp', 
    icon: <FaWhatsapp />, 
    name: 'Эдгарюша🖤', 
    handle: 'Account', 
    link: 'https://wa.me/+77021582932',
    actionText: 'Начать чат',
    avatar: '/vk.png',
  },
  { 
    network: 'vk', 
    icon: <FaVk />, 
    name: '刁丑厂卂尸 山丅尸口从卂乇尸', 
    handle: 'vk.com/minerofyourhearts', 
    link: 'https://vk.com/minerofyourhearts',
    actionText: 'Перейти в профиль',
    avatar: '/vk.png', 
  },
  { 
    network: 'instagram', 
    icon: <FaInstagram />, 
    name: 'МЛАДШИЙ ЛЕЙТЕНАНТ🖤', 
    handle: '@mcciahha.oos', 
    link: 'https://www.instagram.com/mcciahha.oos',
    actionText: 'Подписаться',
    avatar: '/inst.png',
  },
];

function Contacts() {
  return (
    <section id="contacts" className={styles.contactsSection}>
      <MatrixBackground />
      
      <div className={styles.grid}>
        {contacts.map((contact) => (
          <a key={contact.network} href={contact.link} target="_blank" rel="noopener noreferrer" className={`${styles.card} ${styles[contact.network]}`}>
            <div className={styles.networkIcon}>
              {contact.icon}
            </div>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
              <img src={contact.avatar ? contact.avatar : "/avatar.png"} alt="Аватар" />
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{contact.name}</p>
                <p className={styles.userHandle}>{contact.handle}</p>
              </div>
            </div>
            <div className={styles.actionButton}>
              {contact.icon}
              <span>{contact.actionText}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contacts;