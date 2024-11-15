import { Layout } from 'antd';
import PlantsList from './modules/PlantsList/PlantsList';
import Router from './routes/Router';

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Router/>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export default App
