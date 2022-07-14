import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export function CalendarSvg(props: SvgProps) {
  return (
    <Svg width={100} height={100} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.421 7.829h-5.056V3.94a3.889 3.889 0 10-7.778 0v3.889H53.893V3.94a3.888 3.888 0 10-7.777 0v3.889h-17.5V3.94a3.888 3.888 0 10-7.778 0v3.889h-4.86A15.573 15.573 0 00.423 23.384v60.665a15.573 15.573 0 0015.555 15.555h29.749a3.89 3.89 0 000-7.778H15.978A7.787 7.787 0 018.2 84.05V23.383a7.786 7.786 0 017.778-7.777h4.86v3.889a3.889 3.889 0 007.778 0v-3.889h17.5v3.889a3.889 3.889 0 007.778 0v-3.889h17.693v3.889a3.889 3.889 0 107.778 0v-3.889h5.056a7.786 7.786 0 017.777 7.778V45.55a3.889 3.889 0 007.777 0V23.383A15.572 15.572 0 0084.421 7.83zm-9.086 29.228a4.037 4.037 0 011.537.306 4.017 4.017 0 01-.753 7.648 4.027 4.027 0 01-3.014-.6 3.984 3.984 0 01-1.108-1.107 4.01 4.01 0 011.108-5.57 4.01 4.01 0 012.23-.677zm-10.16 51.3a16.981 16.981 0 009.435 2.862 17 17 0 0016.98-16.98 16.982 16.982 0 10-26.414 14.119zm-4.658-35.21a25.366 25.366 0 0114.093-4.275 25.396 25.396 0 0125.366 25.366 25.366 25.366 0 11-39.459-21.091zm20.172 18.722h-1.884v-4.403a4.195 4.195 0 00-4.193-4.246 4.192 4.192 0 00-4.193 4.246v8.595a4.194 4.194 0 004.194 4.193h6.079a4.193 4.193 0 000-8.385h-.003zM60.395 37.363a4.422 4.422 0 00-1.618-.306h-.007a4.34 4.34 0 00-2.988 1.176c-.194.186-.37.39-.525.61a3.894 3.894 0 00-.631 1.447 3.83 3.83 0 00.24 2.32 4.008 4.008 0 00.916 1.302c.197.187.412.354.64.5a4.341 4.341 0 001.527.6 4.457 4.457 0 002.446-.23 4.187 4.187 0 001.897-1.479 3.841 3.841 0 000-4.462 4.111 4.111 0 00-1.167-1.107 4.334 4.334 0 00-.73-.371zM41.642 53.81c.554 0 1.103.103 1.618.305.255.1.5.225.73.372.458.289.855.665 1.167 1.107a3.851 3.851 0 01.63 3.014 3.948 3.948 0 01-1.156 2.056 4.267 4.267 0 01-1.371.87 4.453 4.453 0 01-3.239 0 4.277 4.277 0 01-1.37-.87 4.085 4.085 0 01-.525-.608 3.893 3.893 0 01-.632-1.448 3.83 3.83 0 01.24-2.32 4 4 0 01.917-1.302 4.303 4.303 0 011.37-.87 4.42 4.42 0 011.618-.306h.003zM26.516 37.363a4.423 4.423 0 00-1.618-.306h-.003a4.345 4.345 0 00-2.348.677 4.182 4.182 0 00-1.166 1.108 3.894 3.894 0 00-.63 1.448 3.83 3.83 0 00.24 2.32 4.008 4.008 0 00.916 1.302 4.186 4.186 0 001.37.87 4.457 4.457 0 003.239 0 4.192 4.192 0 001.897-1.479c.153-.217.284-.45.39-.693a3.835 3.835 0 000-3.074 3.945 3.945 0 00-.39-.694 4.11 4.11 0 00-1.167-1.108 4.334 4.334 0 00-.73-.371zM24.898 53.81c.554 0 1.103.103 1.618.305.255.1.5.225.73.372.458.289.855.665 1.167 1.107a3.857 3.857 0 01.63 3.014 3.948 3.948 0 01-1.156 2.056 4.266 4.266 0 01-1.371.87 4.453 4.453 0 01-3.239 0 4.278 4.278 0 01-1.37-.87 4.091 4.091 0 01-.526-.608 3.896 3.896 0 01-.63-1.448 3.83 3.83 0 01.24-2.32 4.007 4.007 0 01.916-1.302 4.308 4.308 0 011.37-.87 4.42 4.42 0 011.618-.306h.003zm.825 16.415a4.255 4.255 0 00-1.646 0 4.247 4.247 0 00-3.22 2.92 4.225 4.225 0 003.22 5.37 4.224 4.224 0 004.73-5.762 4.203 4.203 0 00-1.557-1.897 4.243 4.243 0 00-.73-.391 4.358 4.358 0 00-.797-.24zm15.92-.081a4.255 4.255 0 011.62.32 4.246 4.246 0 012.288 2.289 4.227 4.227 0 11-3.907-2.61zm1.617-32.781a4.422 4.422 0 00-1.617-.306h-.004a4.344 4.344 0 00-2.988 1.176c-.194.186-.37.39-.525.61a3.894 3.894 0 00-.632 1.447 3.83 3.83 0 00.24 2.32 4.002 4.002 0 00.917 1.302c.197.187.411.354.64.5a4.341 4.341 0 001.524.6 4.457 4.457 0 002.446-.23 4.187 4.187 0 001.897-1.479 3.841 3.841 0 000-4.462 4.111 4.111 0 00-1.167-1.107 4.334 4.334 0 00-.73-.371z"
        fill="#707070"
      />
    </Svg>
  );
}
