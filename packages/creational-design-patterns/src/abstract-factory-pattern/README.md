## 참여객체
* Abstract Factory
  * Factory의 표준을 정의하여 Component 혹은 Product 를 생성하는데 필요한 인터페이스 제공
  * RocketFactory
* Concrete Factory
  * Abstract Factory가 정의한 인터페이스를 구현하고 Concrete Product를 생성
  * ExperimentalRocketFactory, FreightRocketFactory
* Abstract Product
  * Factory가 생성 할 Product의 인터페이스를 제공
* Concrete Product
  * Factory가 생성 할 실제 객체
  * ExperimentalRocket, FreightRocket 등등..
* Client
  * Factory 전체의 생산 프로세스를 담당
