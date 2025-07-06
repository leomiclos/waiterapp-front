---

### 📄 `README.md`

````
# 🍽️ WaiterApp

Aplicação web desenvolvida com Angular para gerenciamento de pedidos em estabelecimentos gastronômicos. Interface pensada para garçons, com foco em agilidade, responsividade e experiência semelhante a apps mobile.

<p align="center">
  <img src="src/assets/images/logo.svg" alt="Logo do WaiterApp" width="180" />
</p>

---

## 🚀 Tecnologias Utilizadas

- [Angular 17+](https://angular.io/)
- TypeScript
- Reactive Forms
- Angular Router (Lazy Loading)
- SCSS Modularizado
- Splash Screen personalizada
- Estrutura por Feature
- Preparado para PWA

---

## 📦 Funcionalidades

- Tela de login com formulário reativo e validação
- Splash screen animada durante carregamento inicial
- Componentes estilizados com fontes customizadas
- Layout responsivo e centrado verticalmente
- Estrutura escalável para módulos futuros como:
  - Pedidos
  - Cozinha
  - Painel gerencial

---

## 📁 Estrutura do Projeto

```bash
src/
├── app/
│   ├── features/
│   │   └── auth/
│   │       ├── login/
│   │       │   ├── login.component.ts
│   │       │   ├── login.component.html
│   │       │   └── login.component.scss
│   │       ├── auth-routing.module.ts
│   │       └── auth.module.ts
│   ├── shared/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.module.ts
├── assets/
│   ├── fonts/
│   │   ├── GeneralSans-Regular.woff
│   │   ├── GeneralSans-Medium.woff
│   │   └── GeneralSans-Semibold.woff
│   └── images/
│       └── logo.svg
````

---

## 🧪 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/waiterapp.git
cd waiterapp

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
ng serve

# Acesse via navegador
http://localhost:4200
```


## 🤝 Contribuição

Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues ou enviar PRs com melhorias, correções ou sugestões.

---

## 🧑‍💻 Autor

Desenvolvido por [Leonardo Ribeiro Miclos de Abreu](https://www.linkedin.com/in/leonardomiclos/)
📫 Contato: [leonardormiclos@gmail.com](mailto:leonardormiclos@gmail.com)

---

## 📃 Licença

Este projeto está licenciado sob a licença **MIT**.

```

