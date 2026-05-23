import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { By } from '@angular/platform-browser';
describe('counter component: ', () => {
  let component: Counter, fixture: ComponentFixture<Counter>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Counter],
    });

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind counter=0', () => {
    fixture.detectChanges(); /* It looks at your component's TypeScript variables,
     updates the HTML template with the new data, and renders the UI. | works synchronously*/

    //access p (by using debugElement + By => it covers all supported platforms [not just browsers])
    let p = fixture.debugElement.query(By.css('p')); // returns another debugElement

    expect(p.nativeElement.textContent).toContain(0);
  });
  it('should increase counter after clicking button', () => {
    //access btn +
    let increaseBtn = fixture.debugElement.query(By.css('#increment'));
    //fire click
    increaseBtn.triggerEventHandler('click');
    increaseBtn.triggerEventHandler('click');
    increaseBtn.triggerEventHandler('click');

    expect(component.counter()).toBe(3);
    fixture.detectChanges();
    //access p
    let p = fixture.debugElement.query(By.css('p'));

    expect(p.nativeElement.textContent).toContain(3);
  });
  it('should decrease counter after clicking button', () => {
    //access btn +
    let decreaseBtn = fixture.debugElement.query(By.css('#decrement'));
    //fire click
    decreaseBtn.triggerEventHandler('click');
    decreaseBtn.triggerEventHandler('click');

    expect(component.counter()).toBe(-2);
    fixture.detectChanges();
    //access p
    let p = fixture.debugElement.query(By.css('p'));

    expect(p.nativeElement.textContent).toContain(-2);
  });
});
