import replaceMatch from '../../src/list-replace-match';
import assert from 'assert';

describe('replaceMatch', () => {
  const list = [
    { id: 1, v: 1 },
    { id: 2, v: 2 },
    { id: 3, v: 3 },
    { id: 4, v: 4 },
    { id: 5, v: 5 },
    { id: 6, v: 6 },
  ];

  it('should replace element at head of list', () => {
    const modified = replaceMatch(list, x => x.id == 1, {
      id: 1, v: 'XXX'
    });
    assert(modified[0].v == 'XXX');
  });
  it('should replace element at tail of list', () => {
    const modified = replaceMatch(list, x => x.id == 6, {
      id: 6, v: 'XXX'
    });
    assert(modified[5].v == 'XXX');
  });
  it('should replace element at middle of list', () => {
    const modified = replaceMatch(list, x => x.id == 4, {
      id: 4, v: 'XXX'
    });
    assert(modified[3].v == 'XXX');
  });
  it('should append element when no match', () => {
    const modified = replaceMatch(list, x => x.id == 7, {
      id: 7, v: 'XXX'
    });
    assert(modified[6].v == 'XXX');
  });
  it('should not modify original list', () => {
    const modified = replaceMatch(list, x => x.id == 7, {
      id: 7, v: 'XXX'
    });
    assert(modified !== list);
  });
});
