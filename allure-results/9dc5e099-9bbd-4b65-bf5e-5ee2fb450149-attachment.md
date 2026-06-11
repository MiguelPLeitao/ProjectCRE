# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite6_Arrendamentos.spec.js >> Arrendamentos >> Validar Fluxo de Solicitação (Sucesso)
- Location: tests\FRONTEND_test_suite6_Arrendamentos.spec.js:18:9

# Error details

```
ReferenceError: book is not defined
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "📅 Meus Arrendamentos" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Krista JohnsonALUNO
      - button "Sair" [ref=e7] [cursor=pointer]
  - generic [ref=e8]:
    - link "Dashboard" [ref=e9] [cursor=pointer]:
      - /url: dashboard.html
    - link "Livros" [ref=e10] [cursor=pointer]:
      - /url: livros.html
    - link "Favoritos" [ref=e11] [cursor=pointer]:
      - /url: favoritos.html
    - link "Meus Arrendamentos" [ref=e12] [cursor=pointer]:
      - /url: arrendamentos.html
    - link "Compras" [ref=e13] [cursor=pointer]:
      - /url: compras.html
    - link "Minhas Compras" [ref=e14] [cursor=pointer]:
      - /url: minhas-compras.html
  - heading "Solicitar Novo Arrendamento" [level=2] [ref=e15]
  - generic [ref=e17]:
    - generic [ref=e18]:
      - generic [ref=e19]: "Livro:"
      - combobox "Livro:" [ref=e20]:
        - option "Selecione um livro..." [selected]
        - option "Clean Code (Robert C. Martin)"
        - option "Harry Potter (J.K. Rowling)"
        - option "The Scarlet Letter (Miss Allison Bode DVM)"
        - option "Blood Meridian (Ms. Lolita Kautzer)"
        - option "Nostromo (Katlynn Wiegand)"
        - option "Animal Farm (Ethel Bradtke)"
        - option "Vanity Fair (Amelie Farrell)"
        - option "The Republic (Brain Ledner)"
        - option "The Great Gatsby (Sheri Schmeler)"
        - option "American Pastoral (Mr. Jeremiah Heaney)"
        - option "A Handful of Dust (Desiree Wolff DDS)"
        - option "In Cold Blood (Beryl Blick)"
        - option "A Wrinkle in Time (Amanda Wunsch)"
    - generic [ref=e21]:
      - generic [ref=e22]: "Data Início:"
      - textbox "Data Início:" [ref=e23]
    - generic [ref=e24]:
      - generic [ref=e25]: "Data Fim:"
      - textbox "Data Fim:" [ref=e26]
    - button "Solicitar Arrendamento" [active] [ref=e27] [cursor=pointer]
  - heading "Meus Arrendamentos" [level=2] [ref=e28]
  - generic [ref=e30] [cursor=pointer]:
    - 'heading "Arrendamento #3" [level=3] [ref=e31]'
    - paragraph [ref=e32]:
      - strong [ref=e33]: "Livro ID:"
      - text: "14"
    - paragraph [ref=e34]:
      - strong [ref=e35]: "Início:"
      - text: 03/02/2027
    - paragraph [ref=e36]:
      - strong [ref=e37]: "Fim:"
      - text: 14/12/2027
    - paragraph [ref=e38]:
      - strong [ref=e39]: "Status:"
      - text: PENDENTE
```

# Test source

```ts
  14  |         this.MeusArrendamentos_Rents_button = page.getByRole('link', { name: 'Meus Arrendamentos' });
  15  |         this.Admin_Aprovacoes_Approvals_button = page.getByRole('link', { name: 'Aprovações' });
  16  |         this.Admin_Compras_BuyOrders_button = page.getByRole('link', { name: 'Compras Admin' });
  17  |         this.Admin_Usuarios_AdminUsers_button = page.getByRole('link', { name: 'Usuários (Admin)' });
  18  |         this.Compras_BuyOrders_button = page.getByRole('link', { name: 'Compras', exact: true });
  19  |         this.MinhasCompras_MyBuyOrders_button = page.getByRole('link', { name: 'Minhas Compras' });
  20  |         this.MidPageTitle_header = page.getByRole('heading', { name: 'Solicitar Novo Arrendamento' });
  21  |         this.SelecionarLivro_SelectBook_dropdown = page.locator('[id="livroSelect"]');
  22  |         this.SelecionarDataInicio_StartDate_datepicker = page.locator('[id="dataInicio"]');
  23  |         this.SelecionarDataFim_EndDate_datepicker = page.locator('[id="dataFim"]');
  24  |         this.SolicitarArrendamento_RequestRent_button = page.getByRole('button', { name: 'Solicitar Arrendamento' });
  25  |         this.EndPageTitle_header = page.getByRole('heading', { name: 'Meus Arrendamentos', exact: true });
  26  |         this.Messagem_Message_text = page.getByText('Nenhum arrendamento');
  27  | 
  28  |         this.RentCards = page.locator('[id="lista-arrendamentos"] .book-card');
  29  | 
  30  |         this.PAGEBODY_allpage = page.locator('body');
  31  |     }
  32  | 
  33  |     async Select_Book_dropdown(BookName = 'random') {
  34  |         if (BookName === 'random') {
  35  |             const optionsLength = await this.SelecionarLivro_SelectBook_dropdown.evaluate(
  36  |                 select => select.options.length
  37  |             );
  38  |             const randomIndex = faker.number.int({ min: 0, max: optionsLength - 1 });
  39  |             const randomValue = await this.SelecionarLivro_SelectBook_dropdown.evaluate(
  40  |                 (select, index) => select.options[index].value,
  41  |                 randomIndex
  42  |             );
  43  |             await this.SelecionarLivro_SelectBook_dropdown.selectOption(randomValue);
  44  |         } else {
  45  |             await this.SelecionarLivro_SelectBook_dropdown.selectOption({ label: BookName });
  46  |         }
  47  |     }
  48  | 
  49  |     async Select_StartDate_datepicker(dateString = null) {
  50  |         let date;
  51  | 
  52  |         if (dateString === null) {
  53  |             // Generate a random date
  54  |             date = faker.date.future({ days: 180 });
  55  |         } else {
  56  |             // Convert string "15/07/2026" to Date object
  57  |             const [day, month, year] = dateString.split('/');
  58  |             date = new Date(`${year}-${month}-${day}`);
  59  |         }
  60  | 
  61  |         // Format to dd/mm/yyyy
  62  |         const day = String(date.getDate()).padStart(2, '0');
  63  |         const month = String(date.getMonth() + 1).padStart(2, '0');
  64  |         const year = date.getFullYear();
  65  |         const formatted = `${year}-${month}-${day}`;
  66  | 
  67  |         // Fill the input with the formatted date
  68  |         await this.SelecionarDataInicio_StartDate_datepicker.fill(formatted);
  69  | 
  70  |         // Save the date so we can use it in Select_EndDate_datepicker
  71  |         this.startDate = date;
  72  |     }
  73  | 
  74  |     async Select_EndDate_datepicker(dateString = null) {
  75  |         let date;
  76  | 
  77  |         if (dateString === null) {
  78  |             // Generate a random date that's after the start date
  79  |             const nextDay = new Date(this.startDate);
  80  |             nextDay.setDate(nextDay.getDate() + 1);
  81  |             date = faker.date.future({ days: 180, refDate: nextDay });
  82  |         } else {
  83  |             // Convert string "25/08/2026" to Date object
  84  |             const [day, month, year] = dateString.split('/');
  85  |             date = new Date(`${year}-${month}-${day}`);
  86  |         }
  87  | 
  88  |         // Format to dd/mm/yyyy
  89  |         const day = String(date.getDate()).padStart(2, '0');
  90  |         const month = String(date.getMonth() + 1).padStart(2, '0');
  91  |         const year = date.getFullYear();
  92  |         const formatted = `${year}-${month}-${day}`;
  93  | 
  94  |         // Fill the input with the formatted date
  95  |         await this.SelecionarDataFim_EndDate_datepicker.fill(formatted);
  96  |     }
  97  | 
  98  | 
  99  |     async ClickSolicitarArrendamento_RequestRent_button() {
  100 |         await this.SolicitarArrendamento_RequestRent_button.click();
  101 |     }
  102 | 
  103 | 
  104 |     async SelectArrendamento_RentCard_grid(rent = 'random') {
  105 |         const cards = this.RentCards;
  106 |         const count = await cards.count();
  107 | 
  108 |         if (rent === 'random') {
  109 |             const randomIndex = faker.number.int({ min: 0, max: count - 1 });
  110 |             return cards.nth(randomIndex);
  111 |         }
  112 | 
  113 |         if (typeof rent === 'number') {
> 114 |             return cards.nth(book);
      |                              ^ ReferenceError: book is not defined
  115 |         }
  116 | 
  117 |         if (typeof rent === 'object' && book.title && book.author) {
  118 |             return cards.filter({ hasText: book.title }).filter({ hasText: book.author }).first();
  119 |         }
  120 | 
  121 |         return cards.filter({ hasText: rent }).first();
  122 |     }
  123 | 
  124 | 
  125 |     async ClickArrendamentoGrelha_RentfromGrid_button(rent = 'random') {
  126 |         const card = await this.SelectArrendamento_RentCard_grid(rent);
  127 |         await card.click();
  128 |     }
  129 | 
  130 | 
  131 |     async ClickDashboard_button() {
  132 |         await this.Dashboard_button.click();
  133 |     }
  134 | 
  135 |     async ClickLivros_Books_button() {
  136 |         await this.Livros_Books_button.click();
  137 |     }
  138 | 
  139 |     async ClickFavoritos_Favourites_button() {
  140 |         await this.Favoritos_Favourites_button.click();
  141 |     }
  142 | 
  143 |     async ClickMeusArrendamentos_Rents_button() {
  144 |         await this.MeusArrendamentos_Rents_button.click();
  145 |     }
  146 | 
  147 |     async ClickAdmin_Aprovacoes_Approvals_button() {
  148 |         await this.Admin_Aprovacoes_Approvals_button.click();
  149 |     }
  150 | 
  151 |     async ClickAdmin_Compras_BuyOrders_button() {
  152 |         await this.Admin_Compras_BuyOrders_button.click();
  153 |     }
  154 | 
  155 |     async ClickAdmin_Usuarios_AdminUsers_button() {
  156 |         await this.Admin_Usuarios_AdminUsers_button.click();
  157 |     }
  158 | 
  159 |     async ClickCompras_BuyOrders_button() {
  160 |         await this.Compras_BuyOrders_button.click();
  161 |     }
  162 | 
  163 |     async ClickMinhasCompras_MyBuyOrders_button() {
  164 |         await this.MinhasCompras_MyBuyOrders_button.click();
  165 |     }
  166 | 
  167 | 
  168 | }
  169 | 
  170 | export default Rents_page;
```