// 复制文本的函数
function copyText(text) {
  // 创建临时输入框
  const tempInput = document.createElement('textarea');
  tempInput.style.position = 'fixed';
  tempInput.style.opacity = '0';
  tempInput.value = text;
  document.body.appendChild(tempInput);
  
  // 选择并复制
  tempInput.select();
  let success = false;
  
  try {
    success = document.execCommand('copy');
  } catch (err) {
    success = false;
  }
  
  // 清理临时输入框
  document.body.removeChild(tempInput);
  return success;
}

// 查找所有密码输入框并添加复制按钮
function addCopyButton() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  passwordInputs.forEach((input, index) => {
    // 检查是否已经添加过按钮
    if (input.parentElement.querySelector('.password-copy-btn')) {
      return;
    }
    
    // 保存输入框的原始样式
    const originalStyles = {
      width: input.style.width,
      marginLeft: input.style.marginLeft,
      marginRight: input.style.marginRight
    };
    
    // 创建外层容器
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.verticalAlign = 'middle';
    
    // 将输入框包装在容器中
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    // 恢复输入框的原始样式
    if (originalStyles.width) input.style.width = originalStyles.width;
    if (originalStyles.marginLeft) input.style.marginLeft = originalStyles.marginLeft;
    if (originalStyles.marginRight) input.style.marginRight = originalStyles.marginRight;
    
    // 创建复制按钮
    const copyBtn = document.createElement('button');
    copyBtn.className = 'password-copy-btn';
    copyBtn.innerHTML = '📋';
    copyBtn.type = 'button';
    copyBtn.style.position = 'absolute';
    copyBtn.style.left = '0';
    copyBtn.style.top = '50%';
    copyBtn.style.transform = 'translateY(-50%)';
    copyBtn.style.background = '#fff';
    copyBtn.style.border = '1px solid #ddd';
    copyBtn.style.borderRadius = '3px';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.padding = '3px';
    copyBtn.style.fontSize = '12px';
    copyBtn.style.lineHeight = '1';
    copyBtn.style.opacity = '0.8';
    copyBtn.style.transition = 'all 0.2s';
    copyBtn.style.zIndex = '1000';
    copyBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    copyBtn.title = '复制密码';
    
    // 添加鼠标悬停效果
    copyBtn.addEventListener('mouseover', () => {
      copyBtn.style.opacity = '1';
      copyBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
    });
    
    copyBtn.addEventListener('mouseout', () => {
      copyBtn.style.opacity = '0.8';
      copyBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    });
    
    // 添加点击事件
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const password = input.value;
      if (!password) {
        copyBtn.innerHTML = '❌';
        copyBtn.title = '密码为空';
        setTimeout(() => {
          copyBtn.innerHTML = '📋';
          copyBtn.title = '复制密码';
        }, 1000);
        return;
      }
      
      let success = false;
      
      // 首先尝试使用 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(password);
          success = true;
        } catch (err) {
          // 如果 Clipboard API 失败，会在下面尝试备选方法
        }
      }
      
      // 如果 Clipboard API 失败，使用备选方法
      if (!success) {
        success = copyText(password);
      }
      
      // 更新按钮状态
      if (success) {
        copyBtn.innerHTML = '✅';
        copyBtn.title = '复制成功';
      } else {
        copyBtn.innerHTML = '❌';
        copyBtn.title = '复制失败';
      }
      
      // 恢复按钮状态
      setTimeout(() => {
        copyBtn.innerHTML = '📋';
        copyBtn.title = '复制密码';
      }, 1000);
    });
    
    wrapper.appendChild(copyBtn);
  });
}

// 初始运行
addCopyButton();

// 监听 DOM 变化，处理动态加载的密码框
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      addCopyButton();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 