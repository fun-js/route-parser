'use strict';

const DELIMETER = '/';
const NAMED_SEGMENT = ':';
const ASSIGNMENT = '=';
const OR_SIGN = '|';
const MATCH_ANY = '*';
const REGEX_MATCH_ANY = /^\/?([a-zA-Z0-9-_/])\/?$/;
const REGEX_SPACES = /\s/;
const VALID_SEGMENT = /^[a-z0-9_-]+$/i;
const ANY_VALID_SEGMENT = '[a-zA-Z0-9_-]+';
const IS_BEETWEN_PARENTHESES = /^\((.*)\)$/;


module.exports = RouteParser;


function RouteParser(route = '') {
  const { regex, path } = compileRoute(route);

  return Object.freeze({ match });

  function match(route = '') {
    const regexResult = regex.exec(route);

    if (regexResult === null) return false;
    return regexResult[0]
      .split(DELIMETER)
      .reduce((result, segment, i) => {
        result[path[i]] = segment;
        return result;
      }, {});
  }
}

function compileRoute(route) {
  if (route === MATCH_ANY || route === DELIMETER) {
    return REGEX_MATCH_ANY;
  }

  try {
    const segments = route
      .replace(REGEX_SPACES, '')
      .split(DELIMETER)
      .map(parseSegment);

    return createRegex(segments);
  } catch (error) {
    return error;
  }
}

function createRegex(segments) {
  const regexGroups = [];
  const path = segments.map((segment) => {
    regexGroups.push(`(${segment[1] || segment[0]})`);
    return segment[0];
  });
  const regex = new RegExp(`^/?${regexGroups.join(DELIMETER)}$`);

  return { path, regex };
}

function parseSegment(segment, index) {
  if (segment === MATCH_ANY) {
    return [index.toString(), ANY_VALID_SEGMENT];
  }

  if (VALID_SEGMENT.test(segment)) {
    return [segment];
  }

  if (segment[0] === NAMED_SEGMENT) {
    return parseNamedSegment(segment);
  }

  throw new Error();
}

function parseNamedSegment(segment) {
  const namedSegment = segment.slice(1).split(ASSIGNMENT);
  const namedSegmentLen = namedSegment.length;
  const segmentName = namedSegment[0];
  const segmentOptions = namedSegment[1];

  if (VALID_SEGMENT.test(segmentName)) {
    if (namedSegmentLen === 1) {
      return [segmentName, ANY_VALID_SEGMENT];
    }

    if (namedSegmentLen === 2) {
      return parseSegmentOptions(segmentName, segmentOptions);
    }

    throw new Error();
  }

  throw new Error();
}

function parseSegmentOptions(segmentName, segmentOptions) {
  if (IS_BEETWEN_PARENTHESES.test(segmentOptions)) {
    const options = segmentOptions.slice(1, segmentOptions.length - 1).split(OR_SIGN);

    if (options.length > 1 && options.every(opt => VALID_SEGMENT.test(opt))) {
      return [segmentName, options.join(OR_SIGN)];
    }

    return new Error();
  }

  throw new Error();
}
