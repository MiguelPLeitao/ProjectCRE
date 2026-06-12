# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite8_Admin_Usuarios.spec.js >> Admin_Usuarios >> Excluir Usuário (Sucesso)
- Location: tests\FRONTEND_test_suite8_Admin_Usuarios.spec.js:340:9

# Error details

```
Error: Dialog inesperado: Deseja realmente excluir o usuário #57?
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "👨‍💻 Administração de Usuários" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Admin MasterADMIN
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
    - link "Aprovações" [ref=e13] [cursor=pointer]:
      - /url: aprovacoes.html
    - link "Compras Admin" [ref=e14] [cursor=pointer]:
      - /url: compras-admin.html
    - link "Usuários (Admin)" [ref=e15] [cursor=pointer]:
      - /url: admin-usuarios.html
  - generic [ref=e16]:
    - heading "Criar Funcionário / Admin" [level=2] [ref=e17]
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: "Nome:"
        - textbox "Nome:" [ref=e22]
      - generic [ref=e23]:
        - generic [ref=e24]: "Email:"
        - textbox "Email:" [ref=e25]
      - generic [ref=e26]:
        - generic [ref=e27]: "Senha:"
        - textbox "Senha:" [ref=e28]
      - generic [ref=e29]:
        - generic [ref=e30]: "Tipo:"
        - combobox "Tipo:" [ref=e31]:
          - option "Selecione..." [selected]
          - option "Funcionário"
          - option "Administrador"
      - button "Criar Usuário" [ref=e32] [cursor=pointer]
    - heading "Usuários Cadastrados" [level=2] [ref=e33]
    - table [ref=e34]:
      - rowgroup [ref=e35]:
        - row "ID Nome Email Tipo Ações" [ref=e36]:
          - columnheader "ID" [ref=e37]
          - columnheader "Nome" [ref=e38]
          - columnheader "Email" [ref=e39]
          - columnheader "Tipo" [ref=e40]
          - columnheader "Ações" [ref=e41]
      - rowgroup [ref=e42]:
        - row "1 Admin Master admin@biblioteca.com Admin Salvar" [ref=e43]:
          - cell "1" [ref=e44]
          - cell "Admin Master" [ref=e45]:
            - textbox [ref=e46]: Admin Master
          - cell "admin@biblioteca.com" [ref=e47]:
            - textbox [ref=e48]: admin@biblioteca.com
          - cell "Admin" [ref=e49]:
            - combobox [ref=e50]:
              - option "Aluno"
              - option "Funcionário"
              - option "Admin" [selected]
          - cell "Salvar" [ref=e51]:
            - button "Salvar" [ref=e52] [cursor=pointer]
        - row "2 João Funcionário func@biblio.com Funcionário Salvar Excluir" [ref=e53]:
          - cell "2" [ref=e54]
          - cell "João Funcionário" [ref=e55]:
            - textbox [ref=e56]: João Funcionário
          - cell "func@biblio.com" [ref=e57]:
            - textbox [ref=e58]: func@biblio.com
          - cell "Funcionário" [ref=e59]:
            - combobox [ref=e60]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e61]:
            - button "Salvar" [ref=e62] [cursor=pointer]
            - button "Excluir" [ref=e63] [cursor=pointer]
        - row "3 Maria Aluna aluna@teste.com Aluno Salvar Excluir" [ref=e64]:
          - cell "3" [ref=e65]
          - cell "Maria Aluna" [ref=e66]:
            - textbox [ref=e67]: Maria Aluna
          - cell "aluna@teste.com" [ref=e68]:
            - textbox [ref=e69]: aluna@teste.com
          - cell "Aluno" [ref=e70]:
            - combobox [ref=e71]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e72]:
            - button "Salvar" [ref=e73] [cursor=pointer]
            - button "Excluir" [ref=e74] [cursor=pointer]
        - row "4 miguel miguel@teste.com Aluno Salvar Excluir" [ref=e75]:
          - cell "4" [ref=e76]
          - cell "miguel" [ref=e77]:
            - textbox [ref=e78]: miguel
          - cell "miguel@teste.com" [ref=e79]:
            - textbox [ref=e80]: miguel@teste.com
          - cell "Aluno" [ref=e81]:
            - combobox [ref=e82]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e83]:
            - button "Salvar" [ref=e84] [cursor=pointer]
            - button "Excluir" [ref=e85] [cursor=pointer]
        - row "5 funcionario funcionario@teste.com Aluno Salvar Excluir" [ref=e86]:
          - cell "5" [ref=e87]
          - cell "funcionario" [ref=e88]:
            - textbox [ref=e89]: funcionario
          - cell "funcionario@teste.com" [ref=e90]:
            - textbox [ref=e91]: funcionario@teste.com
          - cell "Aluno" [ref=e92]:
            - combobox [ref=e93]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e94]:
            - button "Salvar" [ref=e95] [cursor=pointer]
            - button "Excluir" [ref=e96] [cursor=pointer]
        - row "6 Noah Rowe Simon.Gislason22@yahoo.com Funcionário Salvar Excluir" [ref=e97]:
          - cell "6" [ref=e98]
          - cell "Noah Rowe" [ref=e99]:
            - textbox [ref=e100]: Noah Rowe
          - cell "Simon.Gislason22@yahoo.com" [ref=e101]:
            - textbox [ref=e102]: Simon.Gislason22@yahoo.com
          - cell "Funcionário" [ref=e103]:
            - combobox [ref=e104]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e105]:
            - button "Salvar" [ref=e106] [cursor=pointer]
            - button "Excluir" [ref=e107] [cursor=pointer]
        - row "7 Otis Stamm Jamaal.Langworth@gmail.com Aluno Salvar Excluir" [ref=e108]:
          - cell "7" [ref=e109]
          - cell "Otis Stamm" [ref=e110]:
            - textbox [ref=e111]: Otis Stamm
          - cell "Jamaal.Langworth@gmail.com" [ref=e112]:
            - textbox [ref=e113]: Jamaal.Langworth@gmail.com
          - cell "Aluno" [ref=e114]:
            - combobox [ref=e115]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e116]:
            - button "Salvar" [ref=e117] [cursor=pointer]
            - button "Excluir" [ref=e118] [cursor=pointer]
        - row "8 Mrs. Viviane Schumm Emely1@yahoo.com Funcionário Salvar Excluir" [ref=e119]:
          - cell "8" [ref=e120]
          - cell "Mrs. Viviane Schumm" [ref=e121]:
            - textbox [ref=e122]: Mrs. Viviane Schumm
          - cell "Emely1@yahoo.com" [ref=e123]:
            - textbox [ref=e124]: Emely1@yahoo.com
          - cell "Funcionário" [ref=e125]:
            - combobox [ref=e126]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e127]:
            - button "Salvar" [ref=e128] [cursor=pointer]
            - button "Excluir" [ref=e129] [cursor=pointer]
        - row "9 Oliver Franecki Clifford_Feest@yahoo.com Aluno Salvar Excluir" [ref=e130]:
          - cell "9" [ref=e131]
          - cell "Oliver Franecki" [ref=e132]:
            - textbox [ref=e133]: Oliver Franecki
          - cell "Clifford_Feest@yahoo.com" [ref=e134]:
            - textbox [ref=e135]: Clifford_Feest@yahoo.com
          - cell "Aluno" [ref=e136]:
            - combobox [ref=e137]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e138]:
            - button "Salvar" [ref=e139] [cursor=pointer]
            - button "Excluir" [ref=e140] [cursor=pointer]
        - row "10 Giovani Glover Eleanore99@hotmail.com Funcionário Salvar Excluir" [ref=e141]:
          - cell "10" [ref=e142]
          - cell "Giovani Glover" [ref=e143]:
            - textbox [ref=e144]: Giovani Glover
          - cell "Eleanore99@hotmail.com" [ref=e145]:
            - textbox [ref=e146]: Eleanore99@hotmail.com
          - cell "Funcionário" [ref=e147]:
            - combobox [ref=e148]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e149]:
            - button "Salvar" [ref=e150] [cursor=pointer]
            - button "Excluir" [ref=e151] [cursor=pointer]
        - row "11 Wellington Cronin Reyna_Torphy@yahoo.com Aluno Salvar Excluir" [ref=e152]:
          - cell "11" [ref=e153]
          - cell "Wellington Cronin" [ref=e154]:
            - textbox [ref=e155]: Wellington Cronin
          - cell "Reyna_Torphy@yahoo.com" [ref=e156]:
            - textbox [ref=e157]: Reyna_Torphy@yahoo.com
          - cell "Aluno" [ref=e158]:
            - combobox [ref=e159]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e160]:
            - button "Salvar" [ref=e161] [cursor=pointer]
            - button "Excluir" [ref=e162] [cursor=pointer]
        - row "12 Aaron Russel Theron_Bosco@gmail.com Funcionário Salvar Excluir" [ref=e163]:
          - cell "12" [ref=e164]
          - cell "Aaron Russel" [ref=e165]:
            - textbox [ref=e166]: Aaron Russel
          - cell "Theron_Bosco@gmail.com" [ref=e167]:
            - textbox [ref=e168]: Theron_Bosco@gmail.com
          - cell "Funcionário" [ref=e169]:
            - combobox [ref=e170]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e171]:
            - button "Salvar" [ref=e172] [cursor=pointer]
            - button "Excluir" [ref=e173] [cursor=pointer]
        - row "13 Mr. Cary Wyman Ruthe.Hackett66@hotmail.com Aluno Salvar Excluir" [ref=e174]:
          - cell "13" [ref=e175]
          - cell "Mr. Cary Wyman" [ref=e176]:
            - textbox [ref=e177]: Mr. Cary Wyman
          - cell "Ruthe.Hackett66@hotmail.com" [ref=e178]:
            - textbox [ref=e179]: Ruthe.Hackett66@hotmail.com
          - cell "Aluno" [ref=e180]:
            - combobox [ref=e181]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e182]:
            - button "Salvar" [ref=e183] [cursor=pointer]
            - button "Excluir" [ref=e184] [cursor=pointer]
        - row "14 Miguel EDITADO1 Cathryn.Zulauf@gmail.com Funcionário Salvar Excluir" [ref=e185]:
          - cell "14" [ref=e186]
          - cell "Miguel EDITADO1" [ref=e187]:
            - textbox [ref=e188]: Miguel EDITADO1
          - cell "Cathryn.Zulauf@gmail.com" [ref=e189]:
            - textbox [ref=e190]: Cathryn.Zulauf@gmail.com
          - cell "Funcionário" [ref=e191]:
            - combobox [ref=e192]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e193]:
            - button "Salvar" [ref=e194] [cursor=pointer]
            - button "Excluir" [ref=e195] [cursor=pointer]
        - row "15 Mr. Luther Marks Marlon_Witting93@hotmail.com Aluno Salvar Excluir" [ref=e196]:
          - cell "15" [ref=e197]
          - cell "Mr. Luther Marks" [ref=e198]:
            - textbox [ref=e199]: Mr. Luther Marks
          - cell "Marlon_Witting93@hotmail.com" [ref=e200]:
            - textbox [ref=e201]: Marlon_Witting93@hotmail.com
          - cell "Aluno" [ref=e202]:
            - combobox [ref=e203]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e204]:
            - button "Salvar" [ref=e205] [cursor=pointer]
            - button "Excluir" [ref=e206] [cursor=pointer]
        - row "16 Amanda Rowe Heidi42@yahoo.com Funcionário Salvar Excluir" [ref=e207]:
          - cell "16" [ref=e208]
          - cell "Amanda Rowe" [ref=e209]:
            - textbox [ref=e210]: Amanda Rowe
          - cell "Heidi42@yahoo.com" [ref=e211]:
            - textbox [ref=e212]: Heidi42@yahoo.com
          - cell "Funcionário" [ref=e213]:
            - combobox [ref=e214]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e215]:
            - button "Salvar" [ref=e216] [cursor=pointer]
            - button "Excluir" [ref=e217] [cursor=pointer]
        - row "17 Nikolas McLaughlin Valentina_Gorczany96@gmail.com Aluno Salvar Excluir" [ref=e218]:
          - cell "17" [ref=e219]
          - cell "Nikolas McLaughlin" [ref=e220]:
            - textbox [ref=e221]: Nikolas McLaughlin
          - cell "Valentina_Gorczany96@gmail.com" [ref=e222]:
            - textbox [ref=e223]: Valentina_Gorczany96@gmail.com
          - cell "Aluno" [ref=e224]:
            - combobox [ref=e225]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e226]:
            - button "Salvar" [ref=e227] [cursor=pointer]
            - button "Excluir" [ref=e228] [cursor=pointer]
        - row "19 2 2@2.pt Funcionário Salvar Excluir" [ref=e229]:
          - cell "19" [ref=e230]
          - cell "2" [ref=e231]:
            - textbox [ref=e232]: "2"
          - cell "2@2.pt" [ref=e233]:
            - textbox [ref=e234]: 2@2.pt
          - cell "Funcionário" [ref=e235]:
            - combobox [ref=e236]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e237]:
            - button "Salvar" [ref=e238] [cursor=pointer]
            - button "Excluir" [ref=e239] [cursor=pointer]
        - row "20 Ms. Claire Kertzmann Herman53@hotmail.com Funcionário Salvar Excluir" [ref=e240]:
          - cell "20" [ref=e241]
          - cell "Ms. Claire Kertzmann" [ref=e242]:
            - textbox [ref=e243]: Ms. Claire Kertzmann
          - cell "Herman53@hotmail.com" [ref=e244]:
            - textbox [ref=e245]: Herman53@hotmail.com
          - cell "Funcionário" [ref=e246]:
            - combobox [ref=e247]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e248]:
            - button "Salvar" [ref=e249] [cursor=pointer]
            - button "Excluir" [ref=e250] [cursor=pointer]
        - row "21 Mr. Fred Goldner Noemy98@gmail.com Funcionário Salvar Excluir" [ref=e251]:
          - cell "21" [ref=e252]
          - cell "Mr. Fred Goldner" [ref=e253]:
            - textbox [ref=e254]: Mr. Fred Goldner
          - cell "Noemy98@gmail.com" [ref=e255]:
            - textbox [ref=e256]: Noemy98@gmail.com
          - cell "Funcionário" [ref=e257]:
            - combobox [ref=e258]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e259]:
            - button "Salvar" [ref=e260] [cursor=pointer]
            - button "Excluir" [ref=e261] [cursor=pointer]
        - row "22 Irene Baumbach Jeffrey38@gmail.com Funcionário Salvar Excluir" [ref=e262]:
          - cell "22" [ref=e263]
          - cell "Irene Baumbach" [ref=e264]:
            - textbox [ref=e265]: Irene Baumbach
          - cell "Jeffrey38@gmail.com" [ref=e266]:
            - textbox [ref=e267]: Jeffrey38@gmail.com
          - cell "Funcionário" [ref=e268]:
            - combobox [ref=e269]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e270]:
            - button "Salvar" [ref=e271] [cursor=pointer]
            - button "Excluir" [ref=e272] [cursor=pointer]
        - row "23 Zander Keebler-Wilkinson Marcus2@yahoo.com Funcionário Salvar Excluir" [ref=e273]:
          - cell "23" [ref=e274]
          - cell "Zander Keebler-Wilkinson" [ref=e275]:
            - textbox [ref=e276]: Zander Keebler-Wilkinson
          - cell "Marcus2@yahoo.com" [ref=e277]:
            - textbox [ref=e278]: Marcus2@yahoo.com
          - cell "Funcionário" [ref=e279]:
            - combobox [ref=e280]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e281]:
            - button "Salvar" [ref=e282] [cursor=pointer]
            - button "Excluir" [ref=e283] [cursor=pointer]
        - row "24 Miguel Koelpin Phillip33@yahoo.com Funcionário Salvar Excluir" [ref=e284]:
          - cell "24" [ref=e285]
          - cell "Miguel Koelpin" [ref=e286]:
            - textbox [ref=e287]: Miguel Koelpin
          - cell "Phillip33@yahoo.com" [ref=e288]:
            - textbox [ref=e289]: Phillip33@yahoo.com
          - cell "Funcionário" [ref=e290]:
            - combobox [ref=e291]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e292]:
            - button "Salvar" [ref=e293] [cursor=pointer]
            - button "Excluir" [ref=e294] [cursor=pointer]
        - row "25 Leo Kshlerin Trenton.Goldner@gmail.com Funcionário Salvar Excluir" [ref=e295]:
          - cell "25" [ref=e296]
          - cell "Leo Kshlerin" [ref=e297]:
            - textbox [ref=e298]: Leo Kshlerin
          - cell "Trenton.Goldner@gmail.com" [ref=e299]:
            - textbox [ref=e300]: Trenton.Goldner@gmail.com
          - cell "Funcionário" [ref=e301]:
            - combobox [ref=e302]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e303]:
            - button "Salvar" [ref=e304] [cursor=pointer]
            - button "Excluir" [ref=e305] [cursor=pointer]
        - row "26 Miguel EDITADO2 Franco.Braun56@hotmail.com Funcionário Salvar Excluir" [ref=e306]:
          - cell "26" [ref=e307]
          - cell "Miguel EDITADO2" [ref=e308]:
            - textbox [ref=e309]: Miguel EDITADO2
          - cell "Franco.Braun56@hotmail.com" [ref=e310]:
            - textbox [ref=e311]: Franco.Braun56@hotmail.com
          - cell "Funcionário" [ref=e312]:
            - combobox [ref=e313]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e314]:
            - button "Salvar" [ref=e315] [cursor=pointer]
            - button "Excluir" [ref=e316] [cursor=pointer]
        - row "27 Luis Bartoletti Joshua_Schulist29@gmail.com Funcionário Salvar Excluir" [ref=e317]:
          - cell "27" [ref=e318]
          - cell "Luis Bartoletti" [ref=e319]:
            - textbox [ref=e320]: Luis Bartoletti
          - cell "Joshua_Schulist29@gmail.com" [ref=e321]:
            - textbox [ref=e322]: Joshua_Schulist29@gmail.com
          - cell "Funcionário" [ref=e323]:
            - combobox [ref=e324]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e325]:
            - button "Salvar" [ref=e326] [cursor=pointer]
            - button "Excluir" [ref=e327] [cursor=pointer]
        - row "28 Miss Fidel Yost-Cruickshank Briana_Kuhlman@hotmail.com Funcionário Salvar Excluir" [ref=e328]:
          - cell "28" [ref=e329]
          - cell "Miss Fidel Yost-Cruickshank" [ref=e330]:
            - textbox [ref=e331]: Miss Fidel Yost-Cruickshank
          - cell "Briana_Kuhlman@hotmail.com" [ref=e332]:
            - textbox [ref=e333]: Briana_Kuhlman@hotmail.com
          - cell "Funcionário" [ref=e334]:
            - combobox [ref=e335]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e336]:
            - button "Salvar" [ref=e337] [cursor=pointer]
            - button "Excluir" [ref=e338] [cursor=pointer]
        - row "31 Erick Hettinger I Joanna.Mayert71@yahoo.com Aluno Salvar Excluir" [ref=e339]:
          - cell "31" [ref=e340]
          - cell "Erick Hettinger I" [ref=e341]:
            - textbox [ref=e342]: Erick Hettinger I
          - cell "Joanna.Mayert71@yahoo.com" [ref=e343]:
            - textbox [ref=e344]: Joanna.Mayert71@yahoo.com
          - cell "Aluno" [ref=e345]:
            - combobox [ref=e346]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e347]:
            - button "Salvar" [ref=e348] [cursor=pointer]
            - button "Excluir" [ref=e349] [cursor=pointer]
        - row "32 Funcionário Novo Editado Tate.Russel@yahoo.com Funcionário Salvar Excluir" [ref=e350]:
          - cell "32" [ref=e351]
          - cell "Funcionário Novo Editado" [ref=e352]:
            - textbox [ref=e353]: Funcionário Novo Editado
          - cell "Tate.Russel@yahoo.com" [ref=e354]:
            - textbox [ref=e355]: Tate.Russel@yahoo.com
          - cell "Funcionário" [ref=e356]:
            - combobox [ref=e357]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e358]:
            - button "Salvar" [ref=e359] [cursor=pointer]
            - button "Excluir" [ref=e360] [cursor=pointer]
        - row "33 Sara Bailey Jr. Erik_Schoen@yahoo.com Aluno Salvar Excluir" [ref=e361]:
          - cell "33" [ref=e362]
          - cell "Sara Bailey Jr." [ref=e363]:
            - textbox [ref=e364]: Sara Bailey Jr.
          - cell "Erik_Schoen@yahoo.com" [ref=e365]:
            - textbox [ref=e366]: Erik_Schoen@yahoo.com
          - cell "Aluno" [ref=e367]:
            - combobox [ref=e368]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e369]:
            - button "Salvar" [ref=e370] [cursor=pointer]
            - button "Excluir" [ref=e371] [cursor=pointer]
        - row "34 Judith Ebert-Volkman DDS EDITADO Steve_Connelly3@hotmail.com Funcionário Salvar Excluir" [ref=e372]:
          - cell "34" [ref=e373]
          - cell "Judith Ebert-Volkman DDS EDITADO" [ref=e374]:
            - textbox [ref=e375]: Judith Ebert-Volkman DDS EDITADO
          - cell "Steve_Connelly3@hotmail.com" [ref=e376]:
            - textbox [ref=e377]: Steve_Connelly3@hotmail.com
          - cell "Funcionário" [ref=e378]:
            - combobox [ref=e379]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e380]:
            - button "Salvar" [ref=e381] [cursor=pointer]
            - button "Excluir" [ref=e382] [cursor=pointer]
        - row "35 James Krajcik Katrine_Mueller@yahoo.com Aluno Salvar Excluir" [ref=e383]:
          - cell "35" [ref=e384]
          - cell "James Krajcik" [ref=e385]:
            - textbox [ref=e386]: James Krajcik
          - cell "Katrine_Mueller@yahoo.com" [ref=e387]:
            - textbox [ref=e388]: Katrine_Mueller@yahoo.com
          - cell "Aluno" [ref=e389]:
            - combobox [ref=e390]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e391]:
            - button "Salvar" [ref=e392] [cursor=pointer]
            - button "Excluir" [ref=e393] [cursor=pointer]
        - row "36 Marc Bayer EDITADO Viva.Gislason92@yahoo.com Funcionário Salvar Excluir" [ref=e394]:
          - cell "36" [ref=e395]
          - cell "Marc Bayer EDITADO" [ref=e396]:
            - textbox [ref=e397]: Marc Bayer EDITADO
          - cell "Viva.Gislason92@yahoo.com" [ref=e398]:
            - textbox [ref=e399]: Viva.Gislason92@yahoo.com
          - cell "Funcionário" [ref=e400]:
            - combobox [ref=e401]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e402]:
            - button "Salvar" [ref=e403] [cursor=pointer]
            - button "Excluir" [ref=e404] [cursor=pointer]
        - row "37 Olaf Beatty Marguerite85@hotmail.com Aluno Salvar Excluir" [ref=e405]:
          - cell "37" [ref=e406]
          - cell "Olaf Beatty" [ref=e407]:
            - textbox [ref=e408]: Olaf Beatty
          - cell "Marguerite85@hotmail.com" [ref=e409]:
            - textbox [ref=e410]: Marguerite85@hotmail.com
          - cell "Aluno" [ref=e411]:
            - combobox [ref=e412]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e413]:
            - button "Salvar" [ref=e414] [cursor=pointer]
            - button "Excluir" [ref=e415] [cursor=pointer]
        - row "38 Luis Reynolds EDITADO Rochelle94@hotmail.com Funcionário Salvar Excluir" [ref=e416]:
          - cell "38" [ref=e417]
          - cell "Luis Reynolds EDITADO" [ref=e418]:
            - textbox [ref=e419]: Luis Reynolds EDITADO
          - cell "Rochelle94@hotmail.com" [ref=e420]:
            - textbox [ref=e421]: Rochelle94@hotmail.com
          - cell "Funcionário" [ref=e422]:
            - combobox [ref=e423]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e424]:
            - button "Salvar" [ref=e425] [cursor=pointer]
            - button "Excluir" [ref=e426] [cursor=pointer]
        - row "39 Parker Mills Katrina78@hotmail.com Aluno Salvar Excluir" [ref=e427]:
          - cell "39" [ref=e428]
          - cell "Parker Mills" [ref=e429]:
            - textbox [ref=e430]: Parker Mills
          - cell "Katrina78@hotmail.com" [ref=e431]:
            - textbox [ref=e432]: Katrina78@hotmail.com
          - cell "Aluno" [ref=e433]:
            - combobox [ref=e434]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e435]:
            - button "Salvar" [ref=e436] [cursor=pointer]
            - button "Excluir" [ref=e437] [cursor=pointer]
        - row "40 Vicki Thiel EDITADO Shaina97@hotmail.com Funcionário Salvar Excluir" [ref=e438]:
          - cell "40" [ref=e439]
          - cell "Vicki Thiel EDITADO" [ref=e440]:
            - textbox [ref=e441]: Vicki Thiel EDITADO
          - cell "Shaina97@hotmail.com" [ref=e442]:
            - textbox [ref=e443]: Shaina97@hotmail.com
          - cell "Funcionário" [ref=e444]:
            - combobox [ref=e445]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e446]:
            - button "Salvar" [ref=e447] [cursor=pointer]
            - button "Excluir" [ref=e448] [cursor=pointer]
        - row "41 Laura Batz Kimberly.Reinger@gmail.com Aluno Salvar Excluir" [ref=e449]:
          - cell "41" [ref=e450]
          - cell "Laura Batz" [ref=e451]:
            - textbox [ref=e452]: Laura Batz
          - cell "Kimberly.Reinger@gmail.com" [ref=e453]:
            - textbox [ref=e454]: Kimberly.Reinger@gmail.com
          - cell "Aluno" [ref=e455]:
            - combobox [ref=e456]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e457]:
            - button "Salvar" [ref=e458] [cursor=pointer]
            - button "Excluir" [ref=e459] [cursor=pointer]
        - row "42 Mrs. Thelma Wiza EDITADO Kathleen_Rosenbaum65@yahoo.com Funcionário Salvar Excluir" [ref=e460]:
          - cell "42" [ref=e461]
          - cell "Mrs. Thelma Wiza EDITADO" [ref=e462]:
            - textbox [ref=e463]: Mrs. Thelma Wiza EDITADO
          - cell "Kathleen_Rosenbaum65@yahoo.com" [ref=e464]:
            - textbox [ref=e465]: Kathleen_Rosenbaum65@yahoo.com
          - cell "Funcionário" [ref=e466]:
            - combobox [ref=e467]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e468]:
            - button "Salvar" [ref=e469] [cursor=pointer]
            - button "Excluir" [ref=e470] [cursor=pointer]
        - row "43 Rudy Reichert Essie_Trantow47@yahoo.com Aluno Salvar Excluir" [ref=e471]:
          - cell "43" [ref=e472]
          - cell "Rudy Reichert" [ref=e473]:
            - textbox [ref=e474]: Rudy Reichert
          - cell "Essie_Trantow47@yahoo.com" [ref=e475]:
            - textbox [ref=e476]: Essie_Trantow47@yahoo.com
          - cell "Aluno" [ref=e477]:
            - combobox [ref=e478]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e479]:
            - button "Salvar" [ref=e480] [cursor=pointer]
            - button "Excluir" [ref=e481] [cursor=pointer]
        - row "44 Buster Hermann EDITADO Hoyt87@gmail.com Funcionário Salvar Excluir" [ref=e482]:
          - cell "44" [ref=e483]
          - cell "Buster Hermann EDITADO" [ref=e484]:
            - textbox [ref=e485]: Buster Hermann EDITADO
          - cell "Hoyt87@gmail.com" [ref=e486]:
            - textbox [ref=e487]: Hoyt87@gmail.com
          - cell "Funcionário" [ref=e488]:
            - combobox [ref=e489]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e490]:
            - button "Salvar" [ref=e491] [cursor=pointer]
            - button "Excluir" [ref=e492] [cursor=pointer]
        - row "45 Mrs. Roxanne Willms Cassidy_Greenholt@gmail.com Aluno Salvar Excluir" [ref=e493]:
          - cell "45" [ref=e494]
          - cell "Mrs. Roxanne Willms" [ref=e495]:
            - textbox [ref=e496]: Mrs. Roxanne Willms
          - cell "Cassidy_Greenholt@gmail.com" [ref=e497]:
            - textbox [ref=e498]: Cassidy_Greenholt@gmail.com
          - cell "Aluno" [ref=e499]:
            - combobox [ref=e500]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e501]:
            - button "Salvar" [ref=e502] [cursor=pointer]
            - button "Excluir" [ref=e503] [cursor=pointer]
        - row "46 Barry Marquardt-Botsford EDITADO Jordyn64@yahoo.com Funcionário Salvar Excluir" [ref=e504]:
          - cell "46" [ref=e505]
          - cell "Barry Marquardt-Botsford EDITADO" [ref=e506]:
            - textbox [ref=e507]: Barry Marquardt-Botsford EDITADO
          - cell "Jordyn64@yahoo.com" [ref=e508]:
            - textbox [ref=e509]: Jordyn64@yahoo.com
          - cell "Funcionário" [ref=e510]:
            - combobox [ref=e511]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e512]:
            - button "Salvar" [ref=e513] [cursor=pointer]
            - button "Excluir" [ref=e514] [cursor=pointer]
        - row "47 Carla Emmerich EDITADO Amelia.Crist1@hotmail.com Aluno Salvar Excluir" [ref=e515]:
          - cell "47" [ref=e516]
          - cell "Carla Emmerich EDITADO" [ref=e517]:
            - textbox [ref=e518]: Carla Emmerich EDITADO
          - cell "Amelia.Crist1@hotmail.com" [ref=e519]:
            - textbox [ref=e520]: Amelia.Crist1@hotmail.com
          - cell "Aluno" [ref=e521]:
            - combobox [ref=e522]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e523]:
            - button "Salvar" [ref=e524] [cursor=pointer]
            - button "Excluir" [ref=e525] [cursor=pointer]
        - row "48 Alvah Gutkowski EDITADO Margaret_Steuber@hotmail.com Funcionário Salvar Excluir" [ref=e526]:
          - cell "48" [ref=e527]
          - cell "Alvah Gutkowski EDITADO" [ref=e528]:
            - textbox [ref=e529]: Alvah Gutkowski EDITADO
          - cell "Margaret_Steuber@hotmail.com" [ref=e530]:
            - textbox [ref=e531]: Margaret_Steuber@hotmail.com
          - cell "Funcionário" [ref=e532]:
            - combobox [ref=e533]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e534]:
            - button "Salvar" [ref=e535] [cursor=pointer]
            - button "Excluir" [ref=e536] [cursor=pointer]
        - row "49 Darrin Lehner EDITADO Audrey7@yahoo.com Aluno Salvar Excluir" [ref=e537]:
          - cell "49" [ref=e538]
          - cell "Darrin Lehner EDITADO" [ref=e539]:
            - textbox [ref=e540]: Darrin Lehner EDITADO
          - cell "Audrey7@yahoo.com" [ref=e541]:
            - textbox [ref=e542]: Audrey7@yahoo.com
          - cell "Aluno" [ref=e543]:
            - combobox [ref=e544]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e545]:
            - button "Salvar" [ref=e546] [cursor=pointer]
            - button "Excluir" [ref=e547] [cursor=pointer]
        - row "50 Kailee Parker EDITADO Alexandrine.Thompson96@yahoo.com Funcionário Salvar Excluir" [ref=e548]:
          - cell "50" [ref=e549]
          - cell "Kailee Parker EDITADO" [ref=e550]:
            - textbox [ref=e551]: Kailee Parker EDITADO
          - cell "Alexandrine.Thompson96@yahoo.com" [ref=e552]:
            - textbox [ref=e553]: Alexandrine.Thompson96@yahoo.com
          - cell "Funcionário" [ref=e554]:
            - combobox [ref=e555]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e556]:
            - button "Salvar" [ref=e557] [cursor=pointer]
            - button "Excluir" [ref=e558] [cursor=pointer]
        - row "51 Jackeline Padberg EDITADO Sue_Moen2@gmail.com Aluno Salvar Excluir" [ref=e559]:
          - cell "51" [ref=e560]
          - cell "Jackeline Padberg EDITADO" [ref=e561]:
            - textbox [ref=e562]: Jackeline Padberg EDITADO
          - cell "Sue_Moen2@gmail.com" [ref=e563]:
            - textbox [ref=e564]: Sue_Moen2@gmail.com
          - cell "Aluno" [ref=e565]:
            - combobox [ref=e566]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e567]:
            - button "Salvar" [ref=e568] [cursor=pointer]
            - button "Excluir" [ref=e569] [cursor=pointer]
        - row "52 Donald Rowe DVM EDITADO Phillip.Keeling16@hotmail.com Funcionário Salvar Excluir" [ref=e570]:
          - cell "52" [ref=e571]
          - cell "Donald Rowe DVM EDITADO" [ref=e572]:
            - textbox [ref=e573]: Donald Rowe DVM EDITADO
          - cell "Phillip.Keeling16@hotmail.com" [ref=e574]:
            - textbox [ref=e575]: Phillip.Keeling16@hotmail.com
          - cell "Funcionário" [ref=e576]:
            - combobox [ref=e577]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e578]:
            - button "Salvar" [ref=e579] [cursor=pointer]
            - button "Excluir" [ref=e580] [cursor=pointer]
        - row "53 Mrs. Zola Ledner EDITADO Krista.Sawayn@gmail.com Aluno Salvar Excluir" [ref=e581]:
          - cell "53" [ref=e582]
          - cell "Mrs. Zola Ledner EDITADO" [ref=e583]:
            - textbox [ref=e584]: Mrs. Zola Ledner EDITADO
          - cell "Krista.Sawayn@gmail.com" [ref=e585]:
            - textbox [ref=e586]: Krista.Sawayn@gmail.com
          - cell "Aluno" [ref=e587]:
            - combobox [ref=e588]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e589]:
            - button "Salvar" [ref=e590] [cursor=pointer]
            - button "Excluir" [ref=e591] [cursor=pointer]
        - row "54 Frederik Hagenes EDITADO Xzavier4@gmail.com Funcionário Salvar Excluir" [ref=e592]:
          - cell "54" [ref=e593]
          - cell "Frederik Hagenes EDITADO" [ref=e594]:
            - textbox [ref=e595]: Frederik Hagenes EDITADO
          - cell "Xzavier4@gmail.com" [ref=e596]:
            - textbox [ref=e597]: Xzavier4@gmail.com
          - cell "Funcionário" [ref=e598]:
            - combobox [ref=e599]:
              - option "Aluno"
              - option "Funcionário" [selected]
              - option "Admin"
          - cell "Salvar Excluir" [ref=e600]:
            - button "Salvar" [ref=e601] [cursor=pointer]
            - button "Excluir" [ref=e602] [cursor=pointer]
        - row "55 Jean Metz EDITADO Sasha_Goodwin80@gmail.com Aluno Salvar Excluir" [ref=e603]:
          - cell "55" [ref=e604]
          - cell "Jean Metz EDITADO" [ref=e605]:
            - textbox [ref=e606]: Jean Metz EDITADO
          - cell "Sasha_Goodwin80@gmail.com" [ref=e607]:
            - textbox [ref=e608]: Sasha_Goodwin80@gmail.com
          - cell "Aluno" [ref=e609]:
            - combobox [ref=e610]:
              - option "Aluno" [selected]
              - option "Funcionário"
              - option "Admin"
          - cell "Salvar Excluir" [ref=e611]:
            - button "Salvar" [ref=e612] [cursor=pointer]
            - button "Excluir" [ref=e613] [cursor=pointer]
```

# Test source

```ts
  334 |         await expect(Table_newUserStudentEdited).toBeVisible();
  335 |         const userStudentEditedName = await adminusers_page.Table_GetUserName(Table_newUserStudentEdited);
  336 |         await expect(userStudentEditedName).toBe(`${newUserStudent.usuario.nome} EDITADO`);
  337 |     });
  338 | 
  339 | 
  340 |     test('Excluir Usuário (Sucesso)', async ({ page }) => {
  341 |         const login_page = new Login_page(page);
  342 |         const dashboard_page = new Dashboard_page(page);
  343 |         const adminusers_page = new Admin_AdminUsers_page(page);
  344 | 
  345 | 
  346 |         const ValidUserStudent = {
  347 |             "nome": faker.person.fullName(),
  348 |             "email": faker.internet.email(),
  349 |             "senha": faker.internet.password(),
  350 |             "tipo": 1
  351 |         }
  352 | 
  353 |         const ValidUserEmployee = {
  354 |             "nome": faker.person.fullName(),
  355 |             "email": faker.internet.email(),
  356 |             "senha": faker.internet.password(),
  357 |             "tipo": 2
  358 |         }
  359 | 
  360 |         let responsePOSTnewUserEmployee = await page.request.post('/registro',
  361 |             {
  362 |                 data: ValidUserEmployee
  363 |             });
  364 | 
  365 |         let response2POSTnewUserStudent = await page.request.post('/registro',
  366 |             {
  367 |                 data: ValidUserStudent
  368 |             });
  369 | 
  370 |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  371 |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  372 |         expect(newUserEmployee.usuario).toHaveProperty('id');
  373 |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  374 |         expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
  375 |         expect(newUserEmployee.usuario).toHaveProperty('email');
  376 |         expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
  377 |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  378 | 
  379 |         expect(response2POSTnewUserStudent.status()).toBe(201);
  380 |         let newUserStudent = await response2POSTnewUserStudent.json();
  381 |         expect(newUserStudent.usuario).toHaveProperty('id');
  382 |         expect(newUserStudent.usuario).toHaveProperty('nome');
  383 |         expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
  384 |         expect(newUserStudent.usuario).toHaveProperty('email');
  385 |         expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
  386 |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  387 | 
  388 | 
  389 | 
  390 | 
  391 |         await page.goto('http://localhost:3000/login.html');
  392 | 
  393 |         page.waitForEvent('dialog').then(async dialog => {
  394 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  395 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  396 |                 await dialog.accept();
  397 |             }
  398 |             else {
  399 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  400 |             }
  401 |         });
  402 | 
  403 |         await page.waitForTimeout(3000);
  404 | 
  405 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  406 | 
  407 |         await login_page.ClickEnterLogin_Button();
  408 | 
  409 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  410 | 
  411 |         await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();
  412 | 
  413 |         await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
  414 | 
  415 |         let approvalDialogCount1 = 0;
  416 |         page.on('dialog', async dialog => {
  417 |             approvalDialogCount1++;
  418 | 
  419 |             if (
  420 |                 approvalDialogCount1 === 1 &&
  421 |                 dialog.message().includes('Deseja realmente excluir o usuário')
  422 |             ) {
  423 |                 console.log("dialog message 'Deseja realmente excluir o usuário?' aceite");
  424 |                 await dialog.accept();
  425 |             }
  426 |             else if (
  427 |                 approvalDialogCount1 === 2 &&
  428 |                 dialog.message().includes('Usuário excluído com sucesso!')
  429 |             ) {
  430 |                 console.log("dialog message 'Usuário excluído com sucesso!' aceite");
  431 |                 await dialog.accept();
  432 |             }
  433 |             else {
> 434 |                 throw new Error(`Dialog inesperado: ${dialog.message()}`);
      |                       ^ Error: Dialog inesperado: Deseja realmente excluir o usuário #57?
  435 |             }
  436 |         });
  437 | 
  438 |         await page.waitForTimeout(3000);
  439 | 
  440 |         const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(newUserEmployee.usuario.nome);
  441 |         await expect(Table_newUserEmployee).toBeVisible();
  442 |         const userEmployeeID = await adminusers_page.Table_GetUserId(Table_newUserEmployee);
  443 |         await adminusers_page.Table_ClickDeleteUser(Table_newUserEmployee);
  444 |         await page.reload();
  445 | 
  446 |         await expect(Table_newUserEmployee).not.toBeVisible();
  447 |         const Table_newUserEmployeeDeleted = await adminusers_page.Table_GetUserRow(userEmployeeID);
  448 |         await expect(Table_newUserEmployeeDeleted).not.toBeVisible();
  449 | 
  450 | 
  451 | 
  452 |         let approvalDialogCount2 = 0;
  453 |         page.on('dialog', async dialog => {
  454 |             approvalDialogCount2++;
  455 | 
  456 |             if (
  457 |                 approvalDialogCount2 === 1 &&
  458 |                 dialog.message().includes('Deseja realmente excluir o usuário')
  459 |             ) {
  460 |                 console.log("dialog message 'Deseja realmente excluir o usuário?' aceite");
  461 |                 await dialog.accept();
  462 |             }
  463 |             else if (
  464 |                 approvalDialogCount2 === 2 &&
  465 |                 dialog.message().includes('Usuário excluído com sucesso!')
  466 |             ) {
  467 |                 console.log("dialog message 'Usuário excluído com sucesso!' aceite");
  468 |                 await dialog.accept();
  469 |             }
  470 |             else {
  471 |                 throw new Error(`Dialog inesperado: ${dialog.message()}`);
  472 |             }
  473 |         });
  474 | 
  475 |         await page.waitForTimeout(3000);
  476 | 
  477 |         const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
  478 |         await expect(Table_newUserStudent).toBeVisible();
  479 |         const userStudentID = await adminusers_page.Table_GetUserId(Table_newUserStudent);
  480 |         await adminusers_page.Table_ClickDeleteUser(Table_newUserStudent);
  481 |         await page.reload();
  482 | 
  483 |         await expect(Table_newUserStudent).not.toBeVisible();
  484 |         const Table_newUserStudentEdited = await adminusers_page.Table_GetUserRow(userStudentID);
  485 |         await expect(Table_newUserStudentEdited).not.toBeVisible();
  486 | 
  487 |     });
  488 | 
  489 | })
```