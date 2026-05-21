import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../message/message.service';
import { HeroService } from './hero.service';

describe('hero service:', () => {
  let httpTesting: HttpTestingController, service: HeroService;
  const heroesUrl = 'http://localhost:3000/heroes';
  beforeEach(() => {
    let messageServiceFake = {
      add: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClientTesting(),
        { provide: MessageService, useValue: messageServiceFake },
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });
  it('should make a GET request to fetch the hero by id and emit the returned hero', () => {
    service.getHero(2).subscribe({
      next: (data) => {
        expect(data.strength).toEqual(38);
      },
    });

    let testReq = httpTesting.expectOne(heroesUrl + '/2');
    expect(testReq.request.method).toEqual('GET');

    testReq.flush({ id: 2, name: 'Super man', strength: 38 });
  });
  it('should make a POST request to add a new hero and emit the added hero', () => {
    let hero = { id: 2, name: 'Super man', strength: 38 };
    service.addHero(hero).subscribe({
      next: (data) => {
        expect(data).toEqual(hero);
      },
    });

    let testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toEqual('POST');
    expect(testReq.request.body).toEqual(hero);

    testReq.flush({ id: 2, name: 'Super man', strength: 38 });
  });
  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    httpTesting.verify();
  });
});
