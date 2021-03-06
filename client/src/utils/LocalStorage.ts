/* Copyright 2022 Guy Tsitsiashvili
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/** @author Guy Tsitsiashvili */

interface LocalStorageData {
  token: string;
  theme: "dark" | "light" | "system";
}

class LocalStorage {
  static getItem<K extends keyof LocalStorageData>(key: K): LocalStorageData[K] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static setItem<K extends keyof LocalStorageData>(key: K, value: LocalStorageData[K]): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  static removeItem<K extends keyof LocalStorageData>(key: K): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
