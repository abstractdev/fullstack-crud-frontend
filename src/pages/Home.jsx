import AppLayout from "../components/AppLayout";
import { Col, Row, Typography } from "antd";
function Home() {
  const { Title } = Typography;
  return (
    <AppLayout>
      <Col>
        <Row>
          <Title>C</Title>
          <Title level={5}>reate</Title>
        </Row>
        <Row>
          <Title>R</Title>
          <Title level={5}>ead</Title>
        </Row>
        <Row>
          <Title>U</Title>
          <Title level={5}>pdate</Title>
        </Row>
        <Row>
          <Title>D</Title>
          <Title level={5}>elete</Title>
        </Row>
      </Col>
    </AppLayout>
  );
}

export default Home;
