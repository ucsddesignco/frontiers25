'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BorderTab } from './Tabs/BorderTab';
import { TypographyTab } from './Tabs/TypographyTab/TypographyTab';
import { ColorTab } from './Tabs/ColorTab';

export function CustomizationPanel() {
  return (
    <Tabs defaultValue="color" className="relative h-full w-full">
      <TabsList className="relative top-0 mb-12 grid w-full grid-cols-3">
        <TabsTrigger value="color" className="hover:cursor-pointer">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Color-icon">
              <g id="Group">
                <path
                  id="Vector"
                  d="M16.1679 28.4999C23.0714 28.4999 28.6678 22.9035 28.6678 15.9999C28.6678 9.09641 23.0714 3.5 16.1679 3.5C9.26438 3.5 3.66797 9.09641 3.66797 15.9999C3.66797 22.9035 9.26438 28.4999 16.1679 28.4999Z"
                  stroke="#4D4857"
                  strokeWidth="2"
                />
                <path
                  id="Vector_2"
                  d="M25.0068 7.16117C22.6626 4.81696 19.4832 3.5 16.168 3.5C12.8528 3.5 9.67334 4.81696 7.32914 7.16117C4.98493 9.50538 3.66797 12.6848 3.66797 16C3.66797 19.3152 4.98493 22.4946 7.32914 24.8389L16.168 16L25.0068 7.16117Z"
                  fill="#4D4857"
                />
              </g>
            </g>
          </svg>
        </TabsTrigger>
        <TabsTrigger value="typography" className="h-full hover:cursor-pointer">
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.272727 3.76136V0.227272H18.8409V3.76136H11.6477V23.5H7.46591V3.76136H0.272727ZM30.9545 6.04545V9.22727H20.9205V6.04545H30.9545ZM23.3977 1.86364H27.5114V18.25C27.5114 18.803 27.5947 19.2273 27.7614 19.5227C27.9356 19.8106 28.1629 20.0076 28.4432 20.1136C28.7235 20.2197 29.0341 20.2727 29.375 20.2727C29.6326 20.2727 29.8674 20.2538 30.0795 20.2159C30.2992 20.178 30.4659 20.1439 30.5795 20.1136L31.2727 23.3295C31.053 23.4053 30.7386 23.4886 30.3295 23.5795C29.928 23.6705 29.4356 23.7235 28.8523 23.7386C27.822 23.7689 26.8939 23.6136 26.0682 23.2727C25.2424 22.9242 24.5871 22.3864 24.1023 21.6591C23.625 20.9318 23.3902 20.0227 23.3977 18.9318V1.86364Z"
              fill="#4D4857"
            />
          </svg>
        </TabsTrigger>
        <TabsTrigger value="border" className="hover:cursor-pointer">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6719 4H18.6719C24.1947 4 28.6719 8.47715 28.6719 14V21"
              stroke="#4D4857"
              strokeWidth="3"
            />
            <path
              d="M16.6719 4H4.67188V28H28.6719V16"
              stroke="#4D4857"
              strokeWidth="3"
              strokeDasharray="3 3"
            />
          </svg>
        </TabsTrigger>
      </TabsList>

      <div className="mt-8 h-[260px]">
        <TabsContent value="color">
          <ColorTab />
        </TabsContent>

        <TabsContent value="typography" className="h-full overflow-y-auto">
          <TypographyTab />
        </TabsContent>

        <TabsContent value="border">
          <BorderTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
