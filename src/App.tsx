import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Управление услугами</h1>
        <p>Добавляйте, редактируйте и удаляйте услуги</p>
      </header>

      <main>
        <ServiceForm />
        <ServiceList />
      </main>
    </div>
  );
}