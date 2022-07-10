// 通过继承实现多态
// eslint-disable-next-line max-classes-per-file
class DynamicArray {
  private static DEFAULT_CAPACITY = 10;

  protected size: number = 0;

  protected capacity: number = DynamicArray.DEFAULT_CAPACITY;

  protected elements: [number] = [DynamicArray.DEFAULT_CAPACITY];

  public sizeFunc(): number {
    return this.size;
  }

  public get(index: number): number {
    return this.elements[index];
  }

  public add(e: number): void {
    // eslint-disable-next-line no-plusplus
    this.elements[this.size++] = e;
  }

  protected ensurecapacity(): void {
    // do somethings
  }
}

class SortedDynamicArray extends DynamicArray {
  // @ts-ignore
  public add(e: number) {
    this.ensurecapacity();

    for (let i: number = this.size - 1; i >= 0; i -= 1) {
      // 保证数组中的数据有序
      if (this.elements[i] > e) {
        this.elements[i + 1] = this.elements[i];
      } else {
        break;
      }
      this.elements[i + 1] = e;
    }
  }
}

function main(dynamicArray: DynamicArray) {
  dynamicArray.add(5);
  dynamicArray.add(3);
  dynamicArray.add(2);
}

const dynamicArray: DynamicArray = new SortedDynamicArray();

main(dynamicArray);

// 通过接口实现多态
interface IteratorImpl {
  hasNext(): String;
  next(): String;
  remove(): String;
}

class Array1 implements IteratorImpl {
  private data: String[];

  public hasNext() {
    console.log('has next');
    return 'has next';
  }

  public next() {
    console.log('next');
    return 'next';
  }

  public remove() {
    console.log('remove');
    return 'remove';
  }
}

class LinkedList implements IteratorImpl {
  public hasNext() {
    console.log('LinkedList has next');
    return 'has next';
  }

  public next() {
    console.log('LinkedList next');
    return 'next';
  }

  public remove() {
    console.log('LinkedList remove');
    return 'remove';
  }
}

function print(iterator: IteratorImpl) {
  iterator.hasNext();
}

const arr1 = new Array1();
const arr2 = new LinkedList();

print(arr1);
print(arr2);
