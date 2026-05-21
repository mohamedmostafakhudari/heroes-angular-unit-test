import { ComponentFixture, TestBed } from "@angular/core/testing";
import {Hero} from './hero';
import { By } from "@angular/platform-browser";
describe('hero component:', () => {
  let component:Hero
  let fixture:ComponentFixture<Hero>
  beforeEach(async ()=>{
    //1
   /* await  */TestBed.configureTestingModule({
      imports:[Hero]
    })/* .compileComponents() */

    //2
     fixture=TestBed.createComponent(Hero)
    //3
    component= fixture.componentInstance
    
  })
   it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind hero in template', () => {
    fixture.componentRef.setInput("hero",{id:10,name:"super man",strength:20})

    expect(component.hero()?.name).toEqual("super man")
    fixture.detectChanges()
    //access DOM
    let span=fixture.debugElement.query( By.css("span") )
    //assert
    expect(span.nativeElement.textContent).toContain(10)

    let div= fixture.debugElement.query(By.css("div"))
    expect(div.nativeElement.textContent).toContain("super man")
  });
});
