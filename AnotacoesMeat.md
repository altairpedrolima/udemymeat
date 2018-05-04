##Anotações do Projeto MEAT

### Criando primeiros componentes:

ng generate component header ou forma abreviada:

ng g c header --spec=false

"--spec=false" para não criar testes.

Vai criar:

header.component.css
header.component.html
header.component.ts

Vai Atualizar:

app.module.ts

Componente home:
ng g c home --spec=false


### Para consumir o backend a partir de um observable.

01 - Criar componente de serviço para o recurso, exemplo comment:

ng g service comment

Vai criar uma classe injetavel decorada como serviço.

no construtor do serviço, injetar httpClient:

constructor(private http: HttpClient) { }

Criar métodos relacionados a http nesta classe de serviço.

Pode-se injetar o HttpParams se os métodos exigirem parametros.

02 - Atualizar providers e imports em AppModulo (ou no módulo do pacote do serviço)

Importar HttpClientModule:

import { HttpClientModule } from '@angular/common/http';

Incluir HttpClientModule em imports

Incluir o serviço criado em providers

03 - O componente que acessa o serviço deve:

Injetar a classe de serviço no construtor:

constructor(private commentsService: CommentsService) { }

Em ngOnInit, fazer um subscribe no método da classe de serviço:

this.commentsService.getComments().subscribe(comments => this.comments = comments);

04 - No template do componente, utilizamos as deretivas (como *ngFor) e interpolações para acessar os elementos de serviço obtidos pelo compomente.


### Validação de formulários

incluir novalidate na tab form para desabilitar as validações dos browsers evitando conflitos e delegando para o Angular.

criar uma variável apontando para ngForm:

<form #form="ngForm" novalidate>

Importar FormsModule no AppModule

No template, na tag de input colocar atributo name com valor seguido da diretiva ngModel:

<input type="text" name="name" ngModel>

Para saber em que estado o campo se encontra é preciso obter uma referencia para a diretiva ngModel do campo. Isto é feito com template variables:

<input type="text" name="name" [ngModel]="nameModel" #nameVerify="ngModel" required maxlenght = 3>
<span *ngIf="nameVerify.invalid"> Nome invalido </span>


No exemplo, #nameVerify é uma tamplate variables.

feito isso, pode-se usar a template variables em qualquer lugar para indicar o estado do campo como no exemplo com a diretiva *ngIf

As validações que podem ser atribuidas a um campo são:

Validators:

required -> campo requerido/obrigatório
pattern -> que recebe um padrão de expressão regular Regex
minlenght / maxlenght -> que recebem um número e verifica se está conforme o especificado

Para ajudar dar um feekback visual ao usuário, o Angular associa aos campos do form as classes:

ng-valid / ng-invalid
ng-prinstin / ng-dirty
ng-touched / ng-untouched

Podemos utilizar a verificação se o formulário está valido para efetuar determinadas ações conforme a necessidade exemplo:

<button [disabled]="!form.valid">Cadastrar</button>

Botão é habilitado somente quando o formulário estiver válido.

Para visualizar o estado e os itens do formulário podemos user interpolação conforme segue:

{{form.valid}} {{form.value | json}}

### Reactive Forms

Nova forma de implementar formulários.

No lugar de validadores no ngModel, serão criadas instancias de formsGroups e formControls dentro de um componente.

No componente é preciso criar uma propriedade que vai representar o formulário do tipo FormGroup:

userForm: FormGroup;

No AppModule precisamos importar ReactiveFormsModule


O form é representado por formgroups que vão presentar um ou mais campos dentro dele. Para ajudar nesta tarefa o Angular disponibiliza um objeto chamado FormBuider que ajuda na criação dos campos e outros grupos. 

Vamos precisar receber o FormBuilder como injeção de dependencia:

constructor(private formBuilder: FormBuilder) { }


E criamos os grupos dentro do método ngOnInit criando cada elemento com formBuilder.control:

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      userEmail: this.formBuilder.control('', [Validators.required, Validators.email]),
      userPassword: this.formBuilder.control('')
    });

  }

### Template para ReactiveModel

O templete não usa o ngModel. O form vai ser associado com o group do componente através da diretiva formGroup. Se estiver subgrupos, pode ser associado com a diretiva formGroupName e cada campo dentro do group com formControlName.

O grupo também é associado com classes de css. 

<form [formGroup]="userForm" novalidate>
  <br> {{userForm.valid}} {{userForm.value|json}}

  <br>
  <div>
    <label for="name">Name:</label>
    <input type="text" name="name" formControlName="userName">
  </div>
  <br>
  <div>
    <label for="email">Email:</label>
    <input type="text" name="email" formControlName="userEmail">
  </div>
  <br>
  <div>
    <label for="pass">Password:</label>
    <input type="text" name="pass" formControlName="userPassword">
  </div>
  <br>
</form>



### Outro exemplo


constructor(private orderService: OrderService,
    private router: Router,
private formBuilder: FormBuilder) { }

O FormBuilder tem um método chamado group() onde recebe um objeto com propriedades representando cada campo do formulário



No exemplo abaixo, os campos podem ser inicializados com valores vazio:

ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: '',
      email: '',
      emailConfirmation: '',
      address: '',
      number: '',
      optionalAddress: '',
      paymentOption: ''
    }, { validator: OrderComponent.equalsTo });

}

O mesmo resultado pode ser obtido usando o metodo control() do formBuilder:

ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    }, { validator: OrderComponent.equalsTo });

}


Os validadores podem ser passados em um array ao se criar formBilder.control:

ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', Validators.required)
    }, { validator: OrderComponent.equalsTo });

}

Equivalente ao templateForms, reactiveForms tem os validadores padrões:

required -> campo requerido/obrigatório
pattern -> que recebe um padrão de expressão regular Regex
minlenght / maxlenght -> que recebem um número e verifica se está conforme o especificado

Todos declarados como funções estáticas da classe Validator 

Se os campos estiverem valores que fazem sentidos de serem aplicados subgrupos: 

ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.group({
           street: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
           number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
           optionalStrit: this.formBuilder.control('')
      }),
      paymentOption: this.formBuilder.control('', Validators.required)
    }, { validator: OrderComponent.equalsTo });

}




