import * as React from 'react';
import Svg, { SvgProps, G, Path, Text, TSpan, Rect } from 'react-native-svg';
import { processFontFamily, useFonts } from 'expo-font';
import { useSchedulePaymentCreditCard } from '../../hooks/useSchedulePaymentCreditCard';

export function CreditCardFront(props: SvgProps) {
  const { number, expiry, name } = useSchedulePaymentCreditCard();

  const [loaded] = useFonts({
    Teko: require('../../assets/fonts/Teko.ttf'),
  });

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 398 247"
      fill="none"
      {...props}
    >
      {loaded && (
        <G transform="translate(-4292.083 3513.639)">
          <G transform="translate(4292.083 -3513.639)">
            <Path
              d="M590.443,461.542a20.611,20.611,0,0,1-20.7,20.7H213.3a20.611,20.611,0,0,1-20.7-20.7V256.3a20.611,20.611,0,0,1,20.7-20.7H569.745a20.611,20.611,0,0,1,20.7,20.7Z"
              transform="translate(-192.6 -235.6)"
              fill="#f0f0f0"
            />
            <G transform="translate(36.795 70.715)">
              <G transform="translate(0 41.394)">
                <Path
                  d="M199,256.25a9.081,9.081,0,0,0,9.2,9.2h9.774V255.1H199Z"
                  transform="translate(-199 -255.1)"
                  fill="#d5d5d5"
                />
              </G>
              <G transform="translate(0 27.596)">
                <Rect width="18.972" height="10.349" fill="#d5d5d5" />
              </G>
              <Path
                d="M199,257.1v1.15h18.972V247.9H208.2A9.081,9.081,0,0,0,199,257.1Z"
                transform="translate(-199 -247.9)"
                fill="#d5d5d5"
              />
              <G transform="translate(21.847)">
                <Path
                  d="M228.671,247.9H202.8v51.743h13.223V258.249H237.87V257.1A9.081,9.081,0,0,0,228.671,247.9Z"
                  transform="translate(-202.8 -247.9)"
                  fill="#d5d5d5"
                />
              </G>
              <G transform="translate(0 13.798)">
                <Rect width="18.972" height="10.349" fill="#d5d5d5" />
              </G>
              <G transform="translate(38.519 13.798)">
                <Rect width="18.397" height="10.349" fill="#d5d5d5" />
              </G>
              <G transform="translate(38.519 27.596)">
                <Rect width="18.397" height="10.349" fill="#d5d5d5" />
              </G>
              <G transform="translate(38.519 41.394)">
                <Path
                  d="M205.7,265.449h9.2a9.081,9.081,0,0,0,9.2-9.2V255.1H205.7v10.349Z"
                  transform="translate(-205.7 -255.1)"
                  fill="#d5d5d5"
                />
              </G>
            </G>
            <G transform="translate(304.706 188.573)">
              <G transform="translate(33.92 0.575)">
                <Path
                  d="M258.974,268.5a29.128,29.128,0,0,0-7.474,1.15c6.324,4.025,9.774,10.923,9.774,18.972a23.115,23.115,0,0,1-9.774,18.972c2.3,1.15,4.6,1.15,7.474,1.15a20.611,20.611,0,0,0,20.7-20.7A20.389,20.389,0,0,0,258.974,268.5Z"
                  transform="translate(-251.5 -268.5)"
                  fill="#f1c40f"
                />
              </G>
              <Path
                d="M286.994,289.1a20.3,20.3,0,0,0-10.349-17.822A19.854,19.854,0,0,0,266.3,268.4a20.7,20.7,0,1,0,0,41.394,21.517,21.517,0,0,0,10.348-2.875A20.3,20.3,0,0,0,286.994,289.1Z"
                transform="translate(-245.6 -268.4)"
                fill="#e74c3c"
              />
            </G>
            <G transform="translate(33.717 25.487)">
              <Path
                d="M226.523,259.447a11.478,11.478,0,0,1-5.174,1.15c-5.174,0-8.049-3.45-8.049-8.049a13.87,13.87,0,0,1,4.024-9.774A12.109,12.109,0,0,1,224.8,239.9c2.3,0,4.024.575,4.6,1.15l-.575,1.725c-.575-.575-2.3-.575-4.024-.575a7.381,7.381,0,0,0-5.749,2.3,10.929,10.929,0,0,0-2.875,7.474c0,3.449,1.725,6.324,6.324,6.324a32.412,32.412,0,0,0,4.024-.575Z"
                transform="translate(-136.052 -239.325)"
                fill="#536e86"
              />
              <Path
                d="M225.2,255.373a8.545,8.545,0,0,1,.575-3.45h0c-1.725,2.875-3.45,4.024-5.749,4.024s-4.025-2.3-4.025-4.6c0-5.174,3.45-10.349,9.774-10.349a9.785,9.785,0,0,1,4.024.575l-1.725,7.474a30.379,30.379,0,0,0-.575,6.9h-2.3Zm1.725-12.648H225.2c-3.45,0-6.9,4.024-6.9,8.049,0,1.725.575,3.45,2.3,3.45,2.3,0,4.6-2.875,5.174-6.324Z"
                transform="translate(-123.229 -234.101)"
                fill="#536e86"
              />
              <Path
                d="M218.7,255.848l1.725-9.2a17.734,17.734,0,0,0,.575-5.174h2.3c0,1.15,0,2.3-.575,2.875h0c1.15-1.725,2.3-3.45,4.6-3.45h.575l-.575,2.3h-.575c-2.3,0-4.024,2.3-4.6,5.749L221,255.273h-2.3Z"
                transform="translate(-110.407 -234.576)"
                fill="#536e86"
              />
              <Path
                d="M234.773,239.8,231.9,256.473a12.658,12.658,0,0,0-.575,4.6h-2.3l.575-2.875h0a5.525,5.525,0,0,1-5.174,3.45c-2.875,0-4.024-2.3-4.024-5.174,0-5.174,4.024-9.774,8.624-9.774,1.15,0,1.725,0,2.3.575l1.15-6.9h2.3Zm-4.024,8.624c-.575-.575-1.15-.575-2.3-.575-3.449,0-6.324,3.45-6.324,7.474,0,1.725.575,3.45,2.875,3.45,1.725,0,4.024-2.3,4.6-5.174Z"
                transform="translate(-102.333 -239.8)"
                fill="#536e86"
              />
              <Path
                d="M-52.267-10.984v4.949h7.553v-4.949a2.313,2.313,0,0,1,.477-1.591,1.608,1.608,0,0,1,1.255-.53,1.667,1.667,0,0,1,1.278.524,2.271,2.271,0,0,1,.489,1.6V2.625a2.276,2.276,0,0,1-.495,1.6,1.663,1.663,0,0,1-1.273.53,1.6,1.6,0,0,1-1.261-.536,2.356,2.356,0,0,1-.471-1.6V-3.183h-7.553V2.625a2.276,2.276,0,0,1-.495,1.6,1.663,1.663,0,0,1-1.273.53A1.6,1.6,0,0,1-55.3,4.222a2.356,2.356,0,0,1-.471-1.6V-10.984a2.352,2.352,0,0,1,.465-1.591,1.6,1.6,0,0,1,1.267-.53,1.667,1.667,0,0,1,1.278.524A2.271,2.271,0,0,1-52.267-10.984ZM-26.145.775A2.775,2.775,0,0,1-26.5,2.06a4.412,4.412,0,0,1-1.1,1.3,5.664,5.664,0,0,1-1.856,1,7.874,7.874,0,0,1-2.521.377A6.157,6.157,0,0,1-36.632,3,6.436,6.436,0,0,1-38.3-1.664a7.675,7.675,0,0,1,.766-3.5,5.5,5.5,0,0,1,2.215-2.351,6.854,6.854,0,0,1,3.464-.831,6.891,6.891,0,0,1,2.292.365,5.986,5.986,0,0,1,1.767.943,4.519,4.519,0,0,1,1.108,1.231,2.439,2.439,0,0,1,.383,1.22,1.286,1.286,0,0,1-.43.978,1.474,1.474,0,0,1-1.043.4,1.052,1.052,0,0,1-.666-.206,3.268,3.268,0,0,1-.6-.666,4.871,4.871,0,0,0-1.231-1.343,2.788,2.788,0,0,0-1.632-.448,2.777,2.777,0,0,0-2.3,1.113,4.818,4.818,0,0,0-.872,3.046,5.883,5.883,0,0,0,.224,1.667,3.789,3.789,0,0,0,.648,1.3,2.774,2.774,0,0,0,1.025.813,3.115,3.115,0,0,0,1.32.277A2.972,2.972,0,0,0-30.2,1.895,3.916,3.916,0,0,0-28.985.528a3.144,3.144,0,0,1,.636-.848,1.208,1.208,0,0,1,.837-.306,1.241,1.241,0,0,1,.978.448A1.434,1.434,0,0,1-26.145.775ZM-11.3-1.781A7.6,7.6,0,0,1-11.747.87a5.854,5.854,0,0,1-1.3,2.086,5.723,5.723,0,0,1-2.027,1.337,7.165,7.165,0,0,1-2.651.465,6.961,6.961,0,0,1-2.628-.471,5.835,5.835,0,0,1-2.021-1.349,5.833,5.833,0,0,1-1.3-2.074,7.582,7.582,0,0,1-.442-2.645,7.675,7.675,0,0,1,.448-2.675A5.82,5.82,0,0,1-22.375-6.53a5.662,5.662,0,0,1,2.027-1.326,7.156,7.156,0,0,1,2.628-.465,7.144,7.144,0,0,1,2.651.471,5.767,5.767,0,0,1,2.038,1.343,5.806,5.806,0,0,1,1.29,2.074A7.631,7.631,0,0,1-11.3-1.781Zm-3.228,0a4.827,4.827,0,0,0-.866-3.063,2.812,2.812,0,0,0-2.327-1.1,2.882,2.882,0,0,0-1.661.489,3.1,3.1,0,0,0-1.108,1.443,5.875,5.875,0,0,0-.389,2.227A5.828,5.828,0,0,0-20.5.422a3.16,3.16,0,0,0,1.1,1.443,2.846,2.846,0,0,0,1.679.5,2.807,2.807,0,0,0,2.327-1.1A4.811,4.811,0,0,0-14.527-1.781ZM.048,2.92V2.6A8.173,8.173,0,0,1-1.231,3.81,4.813,4.813,0,0,1-2.6,4.516a5.134,5.134,0,0,1-1.608.242,4.738,4.738,0,0,1-2.139-.489,4.992,4.992,0,0,1-1.7-1.4A6.366,6.366,0,0,1-9.137.74a9.106,9.106,0,0,1-.371-2.651,6.91,6.91,0,0,1,1.473-4.7A4.9,4.9,0,0,1-4.159-8.3a5.207,5.207,0,0,1,2.345.477A6.537,6.537,0,0,1,.048-6.353V-11.1a2.4,2.4,0,0,1,.395-1.5A1.343,1.343,0,0,1,1.568-13.1a1.394,1.394,0,0,1,1.125.465,2.074,2.074,0,0,1,.395,1.373V2.92A1.971,1.971,0,0,1,2.664,4.3a1.423,1.423,0,0,1-1.1.46,1.4,1.4,0,0,1-1.09-.477A1.964,1.964,0,0,1,.048,2.92ZM-6.279-1.8A5.489,5.489,0,0,0-5.873.422,3.1,3.1,0,0,0-4.76,1.806a2.751,2.751,0,0,0,1.544.465A2.848,2.848,0,0,0-1.667,1.83,3.038,3.038,0,0,0-.547.475,5.474,5.474,0,0,0-.129-1.8,5.331,5.331,0,0,0-.547-4.014,3.32,3.32,0,0,0-1.678-5.428,2.7,2.7,0,0,0-3.24-5.917a2.634,2.634,0,0,0-1.579.5A3.215,3.215,0,0,0-5.9-3.979,5.714,5.714,0,0,0-6.279-1.8Zm21.574.813H9A4.272,4.272,0,0,0,9.444.94,3.034,3.034,0,0,0,10.587,2.2a3.019,3.019,0,0,0,1.573.424,3.854,3.854,0,0,0,1.055-.136,3.435,3.435,0,0,0,.925-.424,7.056,7.056,0,0,0,.825-.619q.377-.33.978-.9A1.055,1.055,0,0,1,16.65.34a1.165,1.165,0,0,1,.8.271.969.969,0,0,1,.306.766A2.092,2.092,0,0,1,17.415,2.4a4.045,4.045,0,0,1-1.031,1.119,5.872,5.872,0,0,1-1.732.89,7.46,7.46,0,0,1-2.4.353A6.415,6.415,0,0,1,7.436,2.991a6.581,6.581,0,0,1-1.72-4.8A8,8,0,0,1,6.139-4.45,5.832,5.832,0,0,1,7.377-6.542a5.365,5.365,0,0,1,2-1.337,7.19,7.19,0,0,1,2.639-.465,6.259,6.259,0,0,1,3.234.8,5.232,5.232,0,0,1,2.021,2.056,5.406,5.406,0,0,1,.672,2.569q0,1.214-.7,1.573A4.332,4.332,0,0,1,15.295-.992ZM9-2.818h5.832a3.909,3.909,0,0,0-.89-2.468,2.663,2.663,0,0,0-2.033-.819,2.574,2.574,0,0,0-1.974.831A4.132,4.132,0,0,0,9-2.818Z"
                transform="translate(55.767 15.146)"
                fill="#536e86"
              />
            </G>
            <Text
              transform="translate(75.917 214.639)"
              fill="#536e86"
              fontSize="20"
              fontFamily={String(processFontFamily('Teko'))}
            >
              <TSpan
                x="-39"
                y="0"
                fontFamily={String(processFontFamily('Teko'))}
              >
                {expiry}
              </TSpan>
            </Text>
            <Text
              transform="translate(95.917 195.639)"
              fill="#536e86"
              fontSize="20"
              fontFamily={String(processFontFamily('Teko'))}
            >
              <TSpan
                x="0"
                y="19"
                fontFamily={String(processFontFamily('Teko'))}
              >
                {name.toUpperCase()}
              </TSpan>
            </Text>
          </G>
          <G transform="translate(4576.005 -3490.748)">
            <Path
              d="M246.892,279.6v8.626h2.082v-9.044c0-1.959-.974-6.85-6.315-6.877a6.91,6.91,0,0,0-5.087,2.34V263.788H235.49v24.435h2.081v-8.343c0-4.645,2.855-5.7,4.973-5.617,3.018.117,4.348,2.658,4.348,5.334"
              transform="translate(-235.49 -263.788)"
              fill="#536e86"
              fillRule="evenodd"
            />
            <Path
              d="M295.563,289.083a8.474,8.474,0,0,1,6.011,2.49l-1.472,1.472a6.419,6.419,0,1,0,0,9.078l1.472,1.472a8.5,8.5,0,1,1-6.011-14.512"
              transform="translate(-270.457 -280.938)"
              fill="#536e86"
              fillRule="evenodd"
            />
            <Path
              d="M350.33,291.165a6.419,6.419,0,1,1-6.419,6.419,6.419,6.419,0,0,1,6.419-6.419m0-2.082a8.5,8.5,0,1,1-8.5,8.5A8.5,8.5,0,0,1,350.33,289.083Z"
              transform="translate(-307.589 -280.938)"
              fill="#536e86"
              fillRule="evenodd"
            />
            <Path
              d="M419.248,280.419h-.007v-.28a6.42,6.42,0,1,0,.007.295Zm-6.419-8.486a8.481,8.481,0,0,1,6.413,2.92V263.788h2.085v16.42c0,.075,0,.15,0,.225a8.5,8.5,0,1,1-8.5-8.5Z"
              transform="translate(-349.964 -263.788)"
              fill="#536e86"
              fillRule="evenodd"
            />
            <Path
              d="M481.173,294.935a6.42,6.42,0,0,0-12.238,3.279Zm-8.05-5.566a8.5,8.5,0,0,1,10.62,7.033l-14.269,3.823a6.42,6.42,0,0,0,11.409.565l1.8,1.041a8.5,8.5,0,1,1-9.562-12.462Z"
              transform="translate(-392.335 -280.934)"
              fill="#536e86"
              fillRule="evenodd"
            />
          </G>
          <Text
            transform="translate(4356 -3347)"
            fill="#536e86"
            fontSize="35"
            fontFamily={String(processFontFamily('Teko'))}
          >
            <TSpan x="-27.3" y="0">
              {number.substring(0, 4)}
            </TSpan>
          </Text>
          <Text
            transform="translate(4446 -3347)"
            fill="#536e86"
            fontSize="35"
            fontFamily={String(processFontFamily('Teko'))}
          >
            <TSpan x="-27.3" y="0">
              {number.substring(5, 9)}
            </TSpan>
          </Text>
          <Text
            transform="translate(4537 -3347)"
            fill="#536e86"
            fontSize="35"
            fontFamily={String(processFontFamily('Teko'))}
          >
            <TSpan x="-27.3" y="0">
              {number.substring(10, 14)}
            </TSpan>
          </Text>
          <Text
            transform="translate(4627 -3347)"
            fill="#536e86"
            fontSize="35"
            fontFamily={String(processFontFamily('Teko'))}
          >
            <TSpan x="-27.3" y="0">
              {number.substring(15, 19)}
            </TSpan>
          </Text>
        </G>
      )}
    </Svg>
  );
}