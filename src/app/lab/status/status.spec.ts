import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Status } from './status';
import { By } from '@angular/platform-browser';

describe('Status component', () => {
  let component: Status;
  let fixture: ComponentFixture<Status>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Status],
    });

    fixture = TestBed.createComponent(Status);
    component = fixture.componentInstance;
  });
  it('should render initial status as "♥ 0" and button not liked', () => {
    fixture.detectChanges();
    let buttonDe = fixture.debugElement.query(By.css('button'));
    expect(buttonDe.nativeElement.classList).not.toContain('liked');

    let statusSpanDe = buttonDe.query(By.css('span:last-child')); // returns another debugElement
    expect(statusSpanDe.nativeElement.textContent).toContain(0);
  });

  it('should increment status to 1 and mark button as liked when clicked once', () => {
    let statusButton = fixture.debugElement.query(By.css('#statusBtn'));

    statusButton.triggerEventHandler('click');

    expect(component.status()).toBe(1);
    fixture.detectChanges();

    let buttonDe = fixture.debugElement.query(By.css('button'));
    expect(buttonDe.nativeElement.classList).toContain('liked');

    let statusSpanDe = buttonDe.query(By.css('button > span:last-child')); // returns another debugElement
    expect(statusSpanDe.nativeElement.textContent).toContain(1);
  });

  it('should decrement status back to 0 and remove liked class when clicked twice', () => {
    let statusButton = fixture.debugElement.query(By.css('#statusBtn'));

    statusButton.triggerEventHandler('click');
    statusButton.triggerEventHandler('click');

    expect(component.status()).toBe(0);
    fixture.detectChanges();

    let buttonDe = fixture.debugElement.query(By.css('button'));
    expect(buttonDe.nativeElement.classList).not.toContain('liked');

    let statusSpanDe = buttonDe.query(By.css('button > span:last-child')); // returns another debugElement
    expect(statusSpanDe.nativeElement.textContent).toContain(0);
  });
});
