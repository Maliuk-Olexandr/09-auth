import css from './SidebarNotes.module.css';
import Link from 'next/link';

const TAGS=['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <nav className={css.sidebar}>
      <ul className={css.menuList}>
        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag === 'All' ? 'All Notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
