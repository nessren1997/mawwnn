import React, { FC } from "react";
import { Col, Image, Row, Typography } from "antd";
import { Event } from "../../models/event";
import { Blog } from "../../models/blog";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import "./style.less";

const { Title, Text, Paragraph } = Typography;

const isEvent = (data: Event | Blog): data is Event => (data as Event).description !== undefined;

interface Props {
  data: Event | Blog;
}

const EventCard: FC<Props> = ({ data }) => {
  const { t } = useTranslation("common");
  if (isEvent(data)) {
    return (
      <div className="event-card-container">
        <Image
          className="event-card-image"
          height={"280px"}
          preview={false}
          src={data.event_images[0]?.path}
          style={{ objectFit: "cover" }}
        />
        <Paragraph style={{ padding: "0 22px", margin: 6, fontWeight: 600 }} ellipsis={{ rows: 1, symbol: "..." }}>
          {data.name}
        </Paragraph>
        <Col className="event-card-subtitle">
          <Text type="secondary">{data.start_date}</Text>
          <Text type="secondary">{t("to")}</Text>
          <Text type="secondary">{data.end_date}</Text>
        </Col>
        <Link href={`/event/${data.id}`}>
          <Row className="event-card-showmore-btn"> {t("show_more")} </Row>
        </Link>
      </div>
    );
  }
  return (
    <div className="event-card-container">
      <Image className="event-card-image" height={"280px"} preview={false} src={data.image_path} />
      <Title level={5}>{data.article_title}</Title>
      <Col className="event-card-subtitle">
        {/* <Paragraph
          style={{ padding: '0 22px', margin: 6, fontWeight: 600 }}
          ellipsis={{ rows: 2, symbol: '...' }}
        >
          <p
            style={{ color: 'GrayText' }}
            dangerouslySetInnerHTML={{ __html: data?.article_body! }}
          />
        </Paragraph> */}
      </Col>
      <Link href={`/blog/${data.id}`}>
        <Row className="event-card-showmore-btn"> {t("show_more")} </Row>
      </Link>
    </div>
  );
};
export default EventCard;
