import {StrengthPipe} from "./strength-pipe"

describe('strength pipe:', () => {
  let pipe:StrengthPipe
  beforeEach(()=>[
     pipe= new StrengthPipe()
  ])
   it('should return "weak" when strength is 9', () => {
    
    expect(pipe.transform(9)).toMatch(/weak/);
  });
   it('should return "strong" when strength is 10', () => {
    expect(pipe.transform(10)).toMatch(/strong/);
  });
   it('should return "strong" when strength is 19', () => {
    expect(pipe.transform(19)).toMatch(/strong/);
  });
   it('should return "unbelievable" when strength is 20', () => {
    expect(pipe.transform(20)).toMatch(/unbelievable/);
  });
   it('should return "unbelievable" when strength is 22', () => {
    expect(pipe.transform(22)).toMatch(/unbelievable/);
  });
});
