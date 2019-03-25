/**
 * author: Wisnu Pramadhitya Ramadhan
 * Styling
 *
 */
const intervalSize = [2, 4, 8, 16, 24, 32, 40, 64, 80];
const axies = [
  { key: 'l', detail: 'Left' },
  { key: 'r', detail: 'Right' },
  { key: 't', detail: 'Top' },
  { key: 'b', detail: 'Bottom' },
];

function generatePadding() {
  const NAME = 'padding';
  const PREFIX = 'p';
  const result = {};

  for (let i = 0; i < intervalSize.length; i++) {
    const size = intervalSize[i];
    for (let j = 0; j < axies.length; j++) {
      const a = axies[j];
      const key = `${PREFIX}${a.key}${size}`;
      result[key] = {
        [`${NAME}${a.detail}`]: size,
      };
    }
  }

  return result;
}

function generateMargin() {
  const NAME = 'margin';
  const PREFIX = 'm';
  const result = {};

  for (let i = 0; i < intervalSize.length; i++) {
    const size = intervalSize[i];
    for (let j = 0; j < axies.length; j++) {
      const a = axies[j];
      const key = `${PREFIX}${a.key}${size}`;
      result[key] = {
        [`${NAME}${a.detail}`]: size,
      };
    }
  }

  return result;
}

function generateHeightWidth() {
  const widthPrefix = 'w';
  const heightPrefix = 'h';
  const result = {
    [`${widthPrefix}100`]: {
      width: '100%',
    },
    [`${heightPrefix}100`]: {
      height: '100%',
    },
  };

  intervalSize.forEach(size => {
    result[`${heightPrefix}${size}`] = { height: size };
    result[`${widthPrefix}${size}`] = { width: size };
  });

  return result;
}

const colorHexes = [
  { color: 'black', hex: '28292b' },
  { color: 'white', hex: '28292b' },
  { color: 'purple', hex: '28292b' },
  { color: 'darkGrey', hex: '28292b' },
  { color: 'green', hex: '28292b' },
  { color: 'tosca', hex: '28292b' },
  { color: 'red', hex: '28292b' },
];

const transparency = {
  100: 'ff',
  90: 'e6',
  60: '99',
  40: '66',
  10: '1a',
};

function generateColors() {
  const result = {};

  Object.keys(transparency).forEach(t => {
    const tr = transparency[t];
    colorHexes.forEach(item => {
      result[`${item.color}${t}`] = `#${tr}${item.hex}`;
    });
  });

  return result;
}

export const layouts = {
  ...generatePadding(),
  ...generateMargin(),
  ...generateHeightWidth(),
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  windowWidth: {
    width: '100vw',
  },
  windowHeight: {
    height: '100vh',
  },
  marginAuto: {
    margin: 'auto',
  },
  flexDirRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexDirCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexMiddle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posAbs: {
    position: 'absolute',
  },
  posAbsBottom: {
    position: 'absolute',
    bottom: 0,
  },
  sendToBack: {
    zIndex: -1,
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },
};

export const fonts = {
  bold: {
    fontWeight: '700',
  },
  medium: {
    fontWeight: '600',
  },
  normal: {
    fontWeight: '500',
  },
};

export const colors = {
  transparent: 'transparent',
  ...generateColors(),
};

export function StyleSheet(styleCreator) {
  return styleCreator({ layouts, colors, fonts });
}

export default {
  StyleSheet,
  layouts,
  colors,
  fonts,
};
