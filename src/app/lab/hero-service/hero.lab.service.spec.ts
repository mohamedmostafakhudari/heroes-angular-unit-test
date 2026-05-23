import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('hero service (for lab):', () => {
  let httpTesting: HttpTestingController, service: HeroServiceForLab;
  const heroesUrl = 'http://localhost:3000/heroes';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient, provideHttpClientTesting() /* acts as interception */],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroServiceForLab);
  });
  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    httpTesting.verify();
  });

  it('should make a PUT request to update a hero and emit the updated hero', () => {
    let updatedHero = { id: 2, name: 'Batman', strength: 38 };
    service.updateHero(updatedHero).subscribe({
      next: (response) => {
        /* response coming from the flush below */
        expect(response).toEqual(updatedHero);
      },
    });

    // Expect a single request to this endpoint
    let testReq = httpTesting.expectOne(`${heroesUrl}/2`);
    expect(testReq.request.method).toEqual('PUT');
    expect(testReq.request.body).toEqual(updatedHero);

    // Flushing the request causes it to complete, delivering the result. (the mock response)
    testReq.flush({ id: 2, name: 'Batman', strength: 38 });
  });
  it('should make a GET request to fetch heroes and emit the returned heroes', () => {
    service.getHeroes().subscribe({
      next: (response) => {
        expect(response).toHaveLength(3);
      },
    });

    let testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toEqual('GET');

    testReq.flush([
      { id: 1, name: 'Bat man', strength: 40 },
      { id: 2, name: 'Super man', strength: 38 },
      { id: 3, name: 'Spider man', strength: 35 },
    ]);
  });
});
