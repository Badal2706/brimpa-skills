"""Wrapper: rebuild knowledge/INDEX.md. The real script lives in skills/knowledge-base/scripts/ so the skill is self-contained."""
import pathlib, runpy, sys

repo = pathlib.Path(__file__).resolve().parent.parent
sys.argv = [sys.argv[0]] + (sys.argv[1:] or [str(repo / "knowledge")])
runpy.run_path(str(repo / "skills" / "knowledge-base" / "scripts" / "knowledge_index.py"), run_name="__main__")
