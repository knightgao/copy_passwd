// 复制文本的函数
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => fallbackCopyText(text));
  }
  return Promise.resolve(fallbackCopyText(text));
}

// 降级复制方案
function fallbackCopyText(text) {
  const tempInput = document.createElement('textarea');
  tempInput.style.position = 'absolute';
  tempInput.style.left = '-9999px';
  tempInput.style.top = '0';
  tempInput.value = text;
  
  // 将临时输入框添加到一个新的容器中，避免影响现有布局
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'hidden';
  container.appendChild(tempInput);
  document.body.appendChild(container);
  
  tempInput.select();
  let success = false;
  
  try {
    success = document.execCommand('copy');
  } catch (err) {
    success = false;
  }
  
  document.body.removeChild(container);
  return success;
}

// 创建右键菜单（只创建一次）
function createContextMenu() {
  const menu = document.createElement('div');
  menu.id = 'password-context-menu';
  menu.style.position = 'fixed';
  menu.style.display = 'none';
  menu.style.background = '#fff';
  menu.style.border = '1px solid #ddd';
  menu.style.borderRadius = '4px';
  menu.style.padding = '5px 0';
  menu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  menu.style.zIndex = '10000';

  const copyOption = document.createElement('div');
  copyOption.textContent = '复制密码';
  copyOption.style.padding = '8px 15px';
  copyOption.style.cursor = 'pointer';
  copyOption.style.fontSize = '14px';
  copyOption.style.color = '#333';

  copyOption.addEventListener('mouseover', () => {
    copyOption.style.backgroundColor = '#f0f0f0';
  });

  copyOption.addEventListener('mouseout', () => {
    copyOption.style.backgroundColor = 'transparent';
  });

  menu.appendChild(copyOption);
  return menu;
}

// 创建Toast提示组件
function createToast() {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '8px 16px';
  toast.style.background = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = '#fff';
  toast.style.borderRadius = '4px';
  toast.style.fontSize = '14px';
  toast.style.transition = 'all 0.3s ease';
  toast.style.zIndex = '100000';
  toast.style.opacity = '0';
  toast.style.pointerEvents = 'none';
  document.body.appendChild(toast);
  return toast;
}

// 显示Toast提示
function showToast(message, type = 'success') {
  let toast = document.getElementById('password-copy-toast');
  if (!toast) {
    toast = createToast();
    toast.id = 'password-copy-toast';
  }
  
  // 设置不同类型的提示样式
  if (type === 'success') {
    toast.style.background = 'rgba(40, 167, 69, 0.9)';
  } else if (type === 'error') {
    toast.style.background = 'rgba(220, 53, 69, 0.9)';
  }
  
  toast.textContent = message;
  toast.style.opacity = '1';
  
  // 1.5秒后隐藏提示
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 1500);
}

// 添加右键菜单功能
function addPasswordContextMenu() {
  // 如果已经存在菜单，则不重复创建
  let menu = document.getElementById('password-context-menu');
  if (!menu) {
    menu = createContextMenu();
    document.body.appendChild(menu);
  }

  // 当前选中的密码输入框
  let currentPasswordInput = null;

  // 处理右键菜单事件
  function handleContextMenu(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' && target.type === 'password') {
      e.preventDefault();
      currentPasswordInput = target;
      menu.style.display = 'block';
      
      // 确保菜单不会超出视窗
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      
      let left = e.pageX;
      let top = e.pageY;
      
      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth;
      }
      
      if (top + menuHeight > viewportHeight) {
        top = viewportHeight - menuHeight;
      }
      
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
    }
  }

  // 处理复制操作
  async function handleCopy() {
    if (!currentPasswordInput) return;
    
    const password = currentPasswordInput.value;
    if (!password) {
      showToast('密码为空', 'error');
      return;
    }

    try {
      await copyText(password);
      showToast('已复制到剪贴板');
    } catch (err) {
      showToast('复制失败', 'error');
    }
    
    menu.style.display = 'none';
  }

  // 处理点击其他区域关闭菜单
  function handleClickOutside(e) {
    if (!menu.contains(e.target)) {
      menu.style.display = 'none';
      currentPasswordInput = null;
    }
  }

  // 移除旧的事件监听器
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('click', handleClickOutside);
  const copyOption = menu.querySelector('div');
  const oldCopyOption = copyOption.cloneNode(true);
  menu.replaceChild(oldCopyOption, copyOption);

  // 添加新的事件监听器
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', handleClickOutside);
  oldCopyOption.addEventListener('click', handleCopy);
}

// 初始化
addPasswordContextMenu();

// 监听 DOM 变化
const observer = new MutationObserver((mutations) => {
  let shouldReinit = false;
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      // 检查是否添加了新的密码输入框
      mutation.addedNodes.forEach(node => {
        if (node.querySelectorAll) {
          const passwordInputs = node.querySelectorAll('input[type="password"]');
          if (passwordInputs.length > 0) {
            shouldReinit = true;
          }
        }
      });
    }
  });
  
  if (shouldReinit) {
    addPasswordContextMenu();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 