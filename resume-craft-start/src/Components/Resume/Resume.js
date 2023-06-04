import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./Resume.module.css";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    experience: information[sections.experience],
    projects: information[sections.projects],
    skills: information[sections.skills],
    education: information[sections.education],
    profile: information[sections.profile],
    aboutMe: information[sections.aboutMe],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.aboutMe]: (
      <div
        key={"aboutMe"}
        draggable
        onDragOver={() => seTarget(info.aboutMe?.id)}
        onDragEnd={() => setSource(info.aboutMe?.id)}
        className={`${styles.section} ${
          info.aboutMe?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.aboutMe?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info?.aboutMe?.detail}</p>
        </div>
      </div>
    ),

    [sections.experience]: (
      <div
        key={"experience"}
        draggable
        onDragOver={() => seTarget(info.experience?.id)}
        onDragEnd={() => setSource(info.experience?.id)}
        className={`${styles.section} ${
          info.experience?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.experience.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.experience?.details?.map((item) => (
            <div className={styles.item} key={item.role}>
              {item.role ? (
                <p className={styles.title}>{item.role}</p>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className={styles.subTitle}>{item.companyName}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <p className={styles.date}>
                  <MapPin /> Bangalore
                </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    [sections.projects]: (
      <div
        key={"projects"}
        draggable
        onDragOver={() => seTarget(info.projects?.id)}
        onDragEnd={() => setSource(info.projects?.id)}
        className={`${styles.section} ${
          info.projects?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.projects.sectionTitle}</div>
        <div className={styles.content}>
          {info.projects?.details?.map((item) => (
            <div className={styles.item}>
              {item.project ? (
                <p className={styles.title}>{item.project}</p>
              ) : (
                <span />
              )}
              {item.link ? (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.course ? (
                <p className={styles.title}>{item.course}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className={styles.subTitle}>{item.college}</p>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    [sections.skills]: (
      <div
        key={"skills"}
        draggable
        onDragOver={() => seTarget(info.skills?.id)}
        onDragEnd={() => setSource(info.skills?.id)}
        className={`${styles.section} ${
          info.skills?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.skills?.sectionTitle}</div>
        <div className={styles.content}>
          {info.skills?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.skills?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.aboutMe, sections.experience, sections.education],
      [sections.projects, sections.skills],
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
          <p className={styles.heading}>{info.profile?.detail?.name}</p>
          <p className={styles.subHeading}>{info.profile?.detail?.role}</p>

          <div className={styles.links}>
            {info.profile?.detail?.email ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={styles.link} type="email">
                <AtSign /> {info.profile?.detail?.email}
              </a>
            ) : (
              <span />
            )}
            {info.profile?.detail?.phone ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={styles.link}>
                <Phone /> {info.profile?.detail?.phone}
              </a>
            ) : (
              <span />
            )}
            {info.profile?.detail?.linkedin ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={styles.link}>
                <Linkedin /> {info.profile?.detail?.linkedin}
              </a>
            ) : (
              <span />
            )}
            {info.profile?.detail?.github ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={styles.link}>
                <GitHub /> {info.profile?.detail?.github}
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.col1}>
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className={styles.col2}>
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
