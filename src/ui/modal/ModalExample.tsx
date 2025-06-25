"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function ModalExample() {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isClickOutsideModalOpen, setIsClickOutsideModalOpen] = useState(false);
  const [isEscKeyModalOpen, setIsEscKeyModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Modal 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Modal 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• React Portal을 사용한 모달 렌더링</li>
            <li>• Compound Component 패턴 (Header, Content, Footer)</li>
            <li>• 배경 클릭으로 모달 닫기 옵션</li>
            <li>• ESC 키로 모달 닫기 옵션</li>
            <li>• 자동 포커스 관리 및 접근성 지원</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 기본 사용법
import { useState } from "react";
import Modal from "@/ui/modal/Modal";

const [isOpen, setIsOpen] = useState(false);

// 기본 모달
<Modal isOpen={isOpen} hide={() => setIsOpen(false)}>
  <Modal.Header title="모달 제목" hide={() => setIsOpen(false)} />
  <Modal.Content>
    <p>모달 내용</p>
  </Modal.Content>
  <Modal.Footer>
    <button onClick={() => setIsOpen(false)}>닫기</button>
  </Modal.Footer>
</Modal>

// 옵션 설정
<Modal 
  isOpen={isOpen} 
  hide={() => setIsOpen(false)}
  hideOnClickOutside={true}
  hideOnEscKeyClickOutside={true}
>
  {/* 모달 내용 */}
</Modal>`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="space-y-6">
          {/* 기본 모달 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">기본 모달</h3>
            <button
              onClick={() => setIsBasicModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              기본 모달 열기
            </button>

            <Modal
              isOpen={isBasicModalOpen}
              hide={() => setIsBasicModalOpen(false)}
            >
              <Modal.Header
                title="기본 모달"
                hide={() => setIsBasicModalOpen(false)}
              />
              <Modal.Content>
                <div className="p-4">
                  <p className="text-gray-600">이것은 기본 모달입니다.</p>
                  <p className="text-gray-600 mt-2">
                    Header, Content, Footer 구조를 사용합니다.
                  </p>
                </div>
              </Modal.Content>
              <Modal.Footer>
                <div className="flex justify-end gap-2 p-4">
                  <button
                    onClick={() => setIsBasicModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    닫기
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

          {/* 확인 모달 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">확인 모달</h3>
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              삭제 확인 모달 열기
            </button>

            <Modal
              isOpen={isConfirmModalOpen}
              hide={() => setIsConfirmModalOpen(false)}
            >
              <Modal.Header
                title="삭제 확인"
                hide={() => setIsConfirmModalOpen(false)}
              />
              <Modal.Content>
                <div className="p-4">
                  <p className="text-gray-600">
                    정말로 이 항목을 삭제하시겠습니까?
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    이 작업은 되돌릴 수 없습니다.
                  </p>
                </div>
              </Modal.Content>
              <Modal.Footer>
                <div className="flex justify-end gap-2 p-4">
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      alert("삭제되었습니다!");
                      setIsConfirmModalOpen(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    삭제
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

          {/* 폼 모달 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">폼 모달</h3>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              사용자 추가 모달 열기
            </button>

            <Modal
              isOpen={isFormModalOpen}
              hide={() => setIsFormModalOpen(false)}
            >
              <Modal.Header
                title="사용자 추가"
                hide={() => setIsFormModalOpen(false)}
              />
              <Modal.Content>
                <div className="p-4">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이름
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                  </form>
                </div>
              </Modal.Content>
              <Modal.Footer>
                <div className="flex justify-end gap-2 p-4">
                  <button
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      alert("사용자가 추가되었습니다!");
                      setIsFormModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    추가
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

          {/* 배경 클릭으로 닫기 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">배경 클릭으로 닫기</h3>
            <button
              onClick={() => setIsClickOutsideModalOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              배경 클릭 모달 열기
            </button>

            <Modal
              isOpen={isClickOutsideModalOpen}
              hide={() => setIsClickOutsideModalOpen(false)}
              hideOnClickOutside={true}
            >
              <Modal.Header
                title="배경 클릭 모달"
                hide={() => setIsClickOutsideModalOpen(false)}
              />
              <Modal.Content>
                <div className="p-4">
                  <p className="text-gray-600">
                    배경을 클릭하면 모달이 닫힙니다.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    hideOnClickOutside={true} 옵션을 사용합니다.
                  </p>
                </div>
              </Modal.Content>
            </Modal>
          </div>

          {/* ESC 키로 닫기 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">ESC 키로 닫기</h3>
            <button
              onClick={() => setIsEscKeyModalOpen(true)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              ESC 키 모달 열기
            </button>

            <Modal
              isOpen={isEscKeyModalOpen}
              hide={() => setIsEscKeyModalOpen(false)}
              hideOnEscKeyClickOutside={true}
            >
              <Modal.Header
                title="ESC 키 모달"
                hide={() => setIsEscKeyModalOpen(false)}
              />
              <Modal.Content>
                <div className="p-4">
                  <p className="text-gray-600">
                    ESC 키를 누르면 모달이 닫힙니다.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    hideOnEscKeyClickOutside={true} 옵션을 사용합니다.
                  </p>
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">Modal Props</h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">isOpen</code>:
                  모달 표시 여부
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">hide</code>:
                  모달을 닫는 함수
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">children</code>:
                  모달 내용
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    hideOnClickOutside
                  </code>
                  : 배경 클릭으로 닫기 (기본값: false)
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    hideOnEscKeyClickOutside
                  </code>
                  : ESC 키로 닫기 (기본값: false)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Modal.Header Props</h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">title</code>:
                  헤더 제목
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">hide</code>: 닫기
                  버튼 클릭 시 실행할 함수
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">children</code>:
                  추가 헤더 내용
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    titleClassName
                  </code>
                  : 제목 스타일 클래스
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Modal.Content Props</h3>
              <p className="text-sm text-gray-600">
                • <code className="bg-gray-200 px-1 rounded">children</code>:
                모달 본문 내용
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Modal.Footer Props</h3>
              <p className="text-sm text-gray-600">
                • <code className="bg-gray-200 px-1 rounded">children</code>:
                모달 하단 내용 (버튼 등)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
