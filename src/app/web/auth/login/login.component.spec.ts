import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { SharedModule } from '../../../shared';
import { Globals } from '../../../app.globals';
import { AuthenticationService } from '../../../services';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';


const fakeActivatedRoute = {
  snapshot: { data: {} }
};



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginTitle: Title;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, SharedModule, HttpModule, HttpClientModule, ],
      providers: [Globals, AuthenticationService, { provide: Router, useValue: fakeActivatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.nativeElement; // de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it(`should have as title 'Vamos Mais - Login'`, async(() => {
    loginTitle = TestBed.get(Title);
    expect(loginTitle.getTitle()).toBe('Vamos Mais - Login');
  }));

  it(`should have as login title 'BEM VINDO'`, async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const content = el.querySelector('.login--box h1');
    expect(content.innerHTML).toContain('BEM VINDO');
    expect(content.textContent).toContain('BEM VINDO');
  }));

  it(`should have as login description 'Faça parte do maior ecossistema de pesados do Brasil'`, async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const content = el.querySelector('.login--box p');
    expect(content.innerHTML).toContain('Faça parte do maior ecossistema de pesados do Brasil');
    expect(content.textContent).toContain('Faça parte do maior ecossistema de pesados do Brasil');
  }));

  it(`should have as login label 'E-Mail ou CPF'`, async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const content = el.querySelector('.login--fields .form-group:nth-child(1) label');
    expect(content.innerHTML).toContain('E-Mail ou CPF');
    expect(content.textContent).toContain('E-Mail ou CPF');


  }));

  it(`should have as password label 'Senha'`, async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const content = el.querySelector('.login--fields .form-group:nth-child(2) label');
    expect(content.innerHTML).toContain('Senha');
    expect(content.textContent).toContain('Senha');
  }));

  it('email field validity', () => {
    let errors = {};
    const email = component.signIn.controls['login'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('password field validity', () => {
    const login = component.signIn.controls['password'];
    expect(login.valid).toBeFalsy();
  });

  it('form invalid when empty', () => {
    expect(component.signIn.valid).toBeFalsy();
  });


});
