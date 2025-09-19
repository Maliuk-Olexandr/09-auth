'use client';

import css from './TagsMenu.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { NoteTag } from '@/types/note';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {setIsOpen(!isOpen);};

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={toggleMenu}
            >
              All notes
            </Link>
          </li>

          {tags.map(tag => (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggleMenu}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
