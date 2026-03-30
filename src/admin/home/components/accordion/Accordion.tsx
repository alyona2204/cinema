import { useState, type ReactNode } from "react";
import styles from "./accordion.module.css";

export type AccordionItem = {
  header: ReactNode;
  content: ReactNode;
  key: string;
};

function Accordion(props: {
  items: AccordionItem[];
  defaultOpenKeys?: string[];
}) {
  const [openKeys, setOpenKeys] = useState<string[]>(
    props.defaultOpenKeys || [],
  );

  const isOpen = (key: string) => openKeys.includes(key);

  const toggle = (key: string) => {
    if (isOpen(key)) {
      setOpenKeys(openKeys.filter((k) => k !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  return (
    <div className="accordion">
      {props.items.map((item) => {
        const isItemOpen = isOpen(item.key);
        return (
          <div className={`accordion-item ${styles.item}`} key={item.key}>
            <h2 className={`accordion-header ${styles.header}`}>
              <button
                className={`accordion-button ${!isItemOpen ? "collapsed" : ""} ${styles.accordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                onClick={() => toggle(item.key)}
              >
                {item.header}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${isItemOpen ? "show" : ""}`}
            >
              <div className={`accordion-body ${styles.accordionContent}`}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
