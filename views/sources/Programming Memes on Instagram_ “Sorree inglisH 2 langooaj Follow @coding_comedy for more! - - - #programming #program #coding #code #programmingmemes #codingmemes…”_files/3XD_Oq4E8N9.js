if (self.CavalryLogger) { CavalryLogger.start_js_script(document.currentScript); }/*FB_PKG_DELIM*/

__d("PolarisDeleteCommentModal.react",["fbt","IGCoreDialog","PolarisCommentActions","PolarisGenericStrings","PolarisLogger","gkx","react","react-redux-wwwig"],(function(a,b,c,d,e,f,g,h){"use strict";var i=d("react");function a(a){var b=a.analyticsContext,e=a.commentId,f=a.onClose,g=a.postId,j=d("react-redux-wwwig").useDispatch();a=function(a){c("gkx")("2641")||d("PolarisLogger").logAction_DEPRECATED("commentDelete",{source:b}),j(d("PolarisCommentActions").deleteComment(g,e)),f(a)};return i.jsxs(d("IGCoreDialog").IGCoreDialog,{onModalClose:f,children:[i.jsx(d("IGCoreDialog").IGCoreDialogItem,{color:"ig-error-or-destructive",onClick:a,children:h._("Delete Comment")}),i.jsx(d("IGCoreDialog").IGCoreDialogItem,{onClick:f,children:d("PolarisGenericStrings").CANCEL_TEXT})]})}a.displayName=a.name+" [from "+f.id+"]";g["default"]=a}),98);