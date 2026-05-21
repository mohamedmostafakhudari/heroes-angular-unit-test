import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heroes } from './heroes';
import { HeroService } from '../../services/hero-service/hero.service';
import { Hero } from '../hero/hero';
import { Component, input } from '@angular/core';
import { IHero } from '../../models/ihero';
import { Mocked } from 'vitest';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
  template:"",
  selector:"app-hero"
})
class HeroFake{
    hero= input<IHero>()
}

describe('heroes component', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;
  let heroServiceFake:Partial<Mocked<HeroService>>
  let heroesFake=[
    {id:10,name:"super man",strength:10},
    {id:11,name:"bat man",strength:20},
  ]
  beforeEach(async () => {
    
     heroServiceFake={
      getHeroes:vi.fn( function(){ return of(heroesFake) } ),
      addHero:vi.fn(),
      deleteHero:vi.fn(),
    }
    TestBed.configureTestingModule({
      imports: [Heroes,Hero],
      providers:[
        {provide:HeroService,useValue:heroServiceFake}
      ]
    }).overrideComponent(Heroes,{
      set:{
        imports:[HeroFake]
      }
    })

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set heroes from service', () => {
    component.ngOnInit()
    expect(heroServiceFake.getHeroes).toHaveBeenCalled()
    expect(component.heroes()).toEqual(heroesFake)

    fixture.detectChanges()
    let liTags= fixture.debugElement.queryAll(By.css("li"))
    expect(liTags).toHaveLength(heroesFake.length)

    let children= fixture.debugElement.queryAll(By.directive(HeroFake))
    
    expect(children[0].componentInstance.hero()).toEqual(heroesFake[0])
  });
});
