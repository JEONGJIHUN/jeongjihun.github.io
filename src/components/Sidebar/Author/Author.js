// @flow strict
import React, { useRef } from "react";
import { withPrefix, Link } from "gatsby";
import Logo from "./Logo";
import styles from "./Author.module.scss";
import image from "./IMG_2712.jpg";

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string,
  },
  isIndex: ?boolean,
};

const Author = ({ author, isIndex }: Props) => {
  const linkImage = useRef(null);
  const linkText = useRef(null);

  const onMouseMove = (e) => {
    const { left, top } = linkText.current.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    linkImage.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    linkText.current.style.setProperty("--x", `${x}px`);
    linkText.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className={styles["author"]}>
      <Link to="/">
        <img
          src={withPrefix(author.photo)}
          className={styles["author__photo"]}
          width="75"
          height="75"
          alt={author.name}
        />
      </Link>

      <div className={styles["author__title"]}>
        <Link className={styles["author__title-link"]} to="/">
          <Logo />
        </Link>
      </div>

      <p className={styles["author__container"]}>
        <a
          className={styles["author__link"]}
          onMouseMove={onMouseMove}
          href="#"
        >
          {author.bio}
        </a>
        <span className="hover-container">
          <span
            ref={linkText}
            className={styles["author__link-text"]}
            aria-hidden="true"
          >
            {author.bio}
          </span>
          <span className={styles["author__image-container"]}>
            <span ref={linkImage} className={styles["author__image-inner"]}>
              <img
                className={styles["author__image-link"]}
                src={image}
                alt="photo"
              />
            </span>
          </span>
        </span>
      </p>
    </div>
  );
};

export default Author;
