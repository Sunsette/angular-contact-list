import { IfMissingPipe } from './if-missing.pipe';

describe('IfMissingPipe', () => {
  it('create an instance', () => {
    const pipe = new IfMissingPipe();
    expect(pipe).toBeTruthy();
  });
});
