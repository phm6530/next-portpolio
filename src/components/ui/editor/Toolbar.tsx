"use client";
import React from "react";
import styles from "./toolbar.module.scss";
import { Editor } from "@tiptap/react";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h1} ${
            editor.isActive("heading", { level: 2 })
              ? styles.active
              : styles.none
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h2} ${
            editor.isActive("heading", { level: 3 })
              ? styles.active
              : styles.none
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bold} ${
            editor.isActive("bold") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.italic} ${
            editor.isActive("italic") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.strike} ${
            editor.isActive("strike") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
      </div>
      <div className={`${styles.line} `} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bulleted} ${
            editor.isActive("bulletList") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.numbered} ${
            editor.isActive("orderedList") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.link} ${
            editor.isActive("link") ? styles.active : styles.none
          }`}
          // Link는 아직 구현되지 않은 상태가 맞습니다.
          // Customizing 파트에서 구현해보겠습니다.
          onClick={() => {}}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.newline} ${styles.none}`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>
    </div>
  );
};

export default Toolbar;
