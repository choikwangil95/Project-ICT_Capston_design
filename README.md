# ICT Capston Design

## 1 Objects
#### 실시간 여행 경로 트래킹을 기반한 여행 후기 공유 서비스 

여행이 끝나고 남는 것은 사진 뿐이라는 말이 있다.<br/>
실제로 여행중에 찍은 사진들은 여행이 끝나고 난 뒤, 무분별하게 사진첩에 저장된다.<br/>
해당 문제를 해결해 주기위해 여행중 찍은 사진들이 언제, 어디서 찍었는지 한눈에 알아볼 수 있도록 한다.<br/>

## 2 Feature
- 1 google maps api를 사용한 지도 위 유저의 실시간 여행 경로 트래킹 기능 개발
- 2 사진 업로드시 사진의 메타데이터를 추출하여 지도 위에 사진 표시 기능 개발
- 3 지도 위에 사진을 클릭하여 여행중 느낀 감정을 기록하는 CRUD 기능 개발

![image](https://user-images.githubusercontent.com/48672212/101238974-686a9600-3727-11eb-9ca8-96d015a06fae.png)

## 3 Tech Stack
- Django
- Javascript
- Axios API
- Google Maps API
- AWS EC2, RDS
- PostgreDB

## 4 Teams & Role
- 규리 : Server & Database
- 광일 : 기능개발 & E2E Test
- 유림 : 기능개발 

## 5 Branch Strategy
github flow에서 해당 프로젝트에 맞게 수정<br/>
#### feature -> test -> predev - develop -> master
- master : 배포용
- develop : predev에서 test 이후 배포 코드/ 배포 후 bugfix
- predev : 통합 테스트 이후 배포 코드 Test
- test : Test case를 통한 단위 기능의 통합테스트 코드
- feature : 기능 개발 및 단위테스트 

## 6 Progress
- [X] Release 1 : 실시간 이동 경로 트래킹 기능 개발 & 배포 ( 10.15-11.05 )
  - [X] 1차 Sprint : google 지도에 현재 위치 표시
  - [X] 2차 Sprint : 실시간 이동 경로를 google 지도에 선으로 표시

- [X] Release 2 : 사진 메타데이터 추출 및 지도 위에 사진 표시 & 배포 ( 11.05 - 12.03 )<br/>
  - [X] 1차 sprint : 사진 메타데이터 추출 및 사진 업로드, DB 저장<br/>
  - [X] 2차 sprint : 지도 위에 사진 표시 및 통합 테스트<br/>
  
- [X] Release 3 : 회원가입 및 로그인과 CRUD 기능 개발 ( 12.03 - )<br/>
  - [ ] 1차 sprint<br/>
  - [ ] 2차 sprint<br/>
  - [ ] 사용자 시나리오를 통한 Test<br/>
