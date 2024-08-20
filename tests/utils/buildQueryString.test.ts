import { describe, expect, test } from '@jest/globals';
import { buildQueryString, getQueryParams } from '../../shared/utils/buildQueryString';

describe('build string from object', () => {
    test('empty object', () => {
        expect(buildQueryString({})).toEqual('');
    });
    test('object with one element', () => {
        expect(buildQueryString({ one: 'value' })).toEqual('one=value');
    });
    test('object with two elements', () => {
        expect(buildQueryString({ one: 'value', two: 'value-two' })).toEqual('one=value&two=value-two');
    });
    test('object with one fill element and  one empty element', () => {
        expect(buildQueryString({ one: 'value', two: '' })).toEqual('one=value');
    });
    test('object with two empty elements', () => {
        expect(buildQueryString({ one: '', two: '' })).toEqual('');
    });
    test('should encode special characters', () => {
        const params = {
            name: 'John Doe',
            city: 'New York',
        };
        const expected = 'name=John%20Doe&city=New%20York';
        expect(buildQueryString(params)).toBe(expected);
    });
    test('should omit null, undefined, and empty string values', () => {
        const params = {
            name: 'John',
            age: null,
            active: undefined,
            city: '',
        };
        const expected = 'name=John';
        expect(buildQueryString(params)).toBe(expected);
    });
    test('should handle boolean values correctly', () => {
        const params = {
            active: true,
            subscribed: false,
        };
        const expected = 'active=true&subscribed=false';
        expect(buildQueryString(params)).toBe(expected);
    });
});

describe('build object from string', () => {
    test('empty string', () => {
        expect(getQueryParams('')).toEqual({});
    });
    test('should parse a query string into an object', () => {
        const queryString = 'name=John&age=30&active=true';
        const expected = {
            name: 'John',
            age: '30',
            active: 'true',
        };
        expect(getQueryParams(queryString)).toEqual(expected);
    });
    test('should decode encoded characters', () => {
        const queryString = 'name=John%20Doe&city=New%20York';
        const expected = {
            name: 'John Doe',
            city: 'New York',
        };
        expect(getQueryParams(queryString)).toEqual(expected);
    });
    test('should handle query strings with special characters', () => {
        const queryString = 'name=John%20Doe&city=New%20York&active=false';
        const expected = {
            name: 'John Doe',
            city: 'New York',
            active: 'false',
        };
        expect(getQueryParams(queryString)).toEqual(expected);
    });
    test('should handle empty query string values', () => {
        const queryString = 'name=&age=30';
        const expected = {
            name: '',
            age: '30',
        };
        expect(getQueryParams(queryString)).toEqual(expected);
    });
});
