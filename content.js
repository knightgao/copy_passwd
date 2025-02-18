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
    console.log('使用 execCommand 复制' + (success ? '成功' : '失败'));
  } catch (err) {
    console.error('execCommand 复制出错:', err);
    success = false;
  }
  
  // 清理临时输入框
  document.body.removeChild(tempInput);
  return success;
}

// 查找所有密码输入框并添加复制按钮
function addCopyButton() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  console.log('找到密码输入框数量:', passwordInputs.length);
  
  passwordInputs.forEach((input, index) => {
    // 检查是否已经添加过按钮
    if (input.parentElement.querySelector('.password-copy-btn')) {
      console.log(`密码框 ${index + 1} 已经添加过按钮，跳过`);
      return;
    }
    
    console.log(`开始处理第 ${index + 1} 个密码框`);
    
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
    
    console.log(`已为密码框 ${index + 1} 创建容器`);
    
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
      console.log(`密码框 ${index + 1} 的按钮被悬停`);
    });
    
    copyBtn.addEventListener('mouseout', () => {
      copyBtn.style.opacity = '0.8';
      copyBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    });
    
    // 添加点击事件
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`点击了密码框 ${index + 1} 的复制按钮`);
      
      const password = input.value;
      if (!password) {
        console.log(`密码框 ${index + 1} 为空`);
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
          console.log(`密码框 ${index + 1} 使用 Clipboard API 复制成功`);
        } catch (err) {
          console.log(`Clipboard API 失败，尝试备选方法:`, err);
        }
      }
      
      // 如果 Clipboard API 失败，使用备选方法
      if (!success) {
        success = copyText(password);
        if (success) {
          console.log(`密码框 ${index + 1} 使用备选方法复制成功`);
        } else {
          console.error(`密码框 ${index + 1} 所有复制方法都失败了`);
        }
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
    console.log(`密码框 ${index + 1} 处理完成`);
  });
}

console.log('扩展程序开始运行');

// 初始运行
addCopyButton();

// 监听 DOM 变化，处理动态加载的密码框
const observer = new MutationObserver((mutations) => {
  console.log('检测到 DOM 变化，mutations 数量:', mutations.length);
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      console.log('检测到新节点添加，数量:', mutation.addedNodes.length);
      addCopyButton();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('DOM 观察器已启动'); 