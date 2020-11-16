# ICT Capston Design

## 1 Objects
#### 여행이 끝나고 남는 것은 사진 뿐이라는 말이 있다.
실제로 여행중에 찍은 사진들은 여행이 끝나고 난 뒤, 무분별하게 사진첩에 저장된다.<br/>
해당 문제를 해결해 주기위해 여행중 찍은 사진들이 언제, 어디서 찍었는지 한눈에 알아볼 수 있도록<br/>

![image](https://user-images.githubusercontent.com/48672212/99038735-5898df80-25c9-11eb-896f-0e50ad745af3.png)


1 여행 이동 경로를 실시간으로 트래킹하여 지도 위에 선으로 나타내어 주고 <br/>
2 여행 종료 후에 서비스에 사진을 업로드 하게 되면 사진의 메타데이터를 추출하여<br/>
3 여행 이동 경로가 선으로 나타난 지도 위에 사진이 찍힌 장소를 표시해준다.

## 2 Teams & Role
- 규리 : Server & Database
- 광일 : Ajax & E2E Test
- 유림 : Ajax & GUI Test

## 3 Tech Stack
- Django
- Javascript
- Axios API
- Google Maps API
- AWS EC2, RDS
- PostgreDB

## 4 Branch Strategy
github flow에서 해당 프로젝트에 맞게 수정<br/>
#### feature -> test -> predev - develop -> master
- master : 배포용
- develop : predev에서 test 이후 배포 코드
- predev : 통합 테스트 이후 배포 코드 Test
- test : Test case를 통한 단위 기능의 통합테스트 코드
- feature : 기능 개발 및 단위테스트 

## 5 Progress
- [X] Release 1 : 실시간 이동 경로 트래킹 기능 개발 & 배포
  - [X] 1차 Sprint : google 지도에 현재 위치 표시
  - [X] 2차 Sprint : 실시간 이동 경로를 google 지도에 선으로 표시
  ![image](https://user-images.githubusercontent.com/48672212/99239961-21336880-283f-11eb-9758-839924a1a452.png)

<br/>

- [ ] Release 2 : 사진 메타데이터 추출 및 지도 위에 사진 표시 & 배포<br/>
  - [ ] 1차 sprint : 사진 메타데이터 추출 및 사진 업로드, DB 저장<br/>
  - [ ] 2차 sprint : 지도 위에 사진 표시 및 사용성 Test<br/>
  
<br/>

- [ ] Release 3 : 회원가입 및 로그인과 CRUD 기능 개발<br/>
  - [ ] 1차 sprint<br/>
  - [ ] 2차 sprint<br/>
  - [ ] 사용자 시나리오를 통한 Test<br/>
