import { Layout } from "antd";
import Nav from "./Nav/Nav";

function AppLayout({ children }) {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <Nav />
      <Content>{children}</Content>
      <Footer>
        <small>&copy; Copyright 2022</small>
      </Footer>
    </Layout>
  );
}

export default AppLayout;
